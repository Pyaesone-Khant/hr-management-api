import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuid4 from "uuid";
import { RefreshToken } from './refresh-token.entity';

@Injectable()
export class RefreshTokensService {

    constructor(
        @InjectRepository(RefreshToken)
        private readonly refreshTokenRepository: Repository<RefreshToken>
    ) { }

    async create(userId: number): Promise<RefreshToken> {

        let refreshToken: RefreshToken;

        // check if a refresh token already exists for the user
        const tokenAlreadyExist = await this.refreshTokenRepository.findOne({
            where: {
                user: {
                    id: userId
                }
            }
        });
 
        if (tokenAlreadyExist) {
            refreshToken = tokenAlreadyExist;

            // update the token with a new value
            refreshToken.token = uuid4.v4();
            refreshToken.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

            try {
                await this.refreshTokenRepository.save(refreshToken);
            } catch (error) {
                throw new RequestTimeoutException("Request timed out while trying to update refresh token");
            }
        } else {
            try {
                refreshToken = this.refreshTokenRepository.create({
                    token: uuid4.v4(),
                    user: {
                        id: userId
                    }
                });

                await this.refreshTokenRepository.save(refreshToken);
            } catch (error) {
                throw new RequestTimeoutException("Request timed out while trying to create refresh token");
            }
        }


        return refreshToken;
    };

    async findOne(token: string): Promise<RefreshToken> {
        let refreshToken: RefreshToken;

        try {
            refreshToken = await this.refreshTokenRepository.findOne({
                where: {
                    token: token,
                },
                relations: ['user']
            })
        } catch (error) {
            throw new RequestTimeoutException("Request timed out while trying to find refresh token");
        }

        return refreshToken;
    }
}
