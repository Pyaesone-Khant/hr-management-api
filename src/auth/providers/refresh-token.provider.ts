import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/configs/jwt.config';
import { RefreshToken } from 'src/refresh-tokens/refresh-token.entity';
import { RefreshTokensService } from 'src/refresh-tokens/refresh-tokens.service';
import { UsersService } from 'src/users/users.service';
import { GenerateTokenProvider } from './generate-token.provider';

@Injectable()
export class RefreshTokenProvider {

    // This class can be used to manage refresh tokens, such as generating, validating, and revoking them.
    // Currently, it is empty but can be extended with methods as needed.

    constructor(
        private readonly jwtService: JwtService,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

        private readonly usersService: UsersService,

        private readonly generateTokenProvider: GenerateTokenProvider,

        private readonly refreshTokensService: RefreshTokensService
    ) { }

    async generateRefreshToken(refreshToken: string) {

        let token: RefreshToken;

        try {
            token = await this.refreshTokensService.findOne(refreshToken)
        } catch (error) {
            throw new BadRequestException('Invalid refresh token!');
        }

        if (!token) {
            throw new BadRequestException('Invalid refresh token!');
        }

        if (new Date(token.expiresAt).getTime() < new Date().getTime()) {
            throw new BadRequestException('Refresh token expired!');
        }

        const user = token.user;

        const { accessToken, refreshToken: newRefreshToken, accessTokenExpiredTime } = await this.generateTokenProvider.generateAccessToken(user);

        const responseObject = {
            accessToken,
            roles: user.roles?.map(role => role.name) || [],
            expiredAt: accessTokenExpiredTime,
            refreshToken: newRefreshToken
        }

        return responseObject;
    }

}
