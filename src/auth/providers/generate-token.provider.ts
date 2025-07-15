import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/configs/jwt.config';
import { RefreshTokensService } from 'src/refresh-tokens/refresh-tokens.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class GenerateTokenProvider {

    constructor(
        private readonly jwtService: JwtService,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

        private readonly refreshTokensService: RefreshTokensService
    ) { }


    public async generateAccessToken(user: User) {
        const [accessToken, refreshToken] = await Promise.all([
            this.signToken(
                user.id,
                this.jwtConfiguration.accessTokenTtl,
                {
                    roles: user.roles,
                    id: user.id
                }
            ),

            this.refreshTokensService.create(user.id).then(token => token.token)
        ]);

        return {
            accessToken,
            refreshToken,
            accessTokenExpiredTime: new Date(Date.now() + this.jwtConfiguration.accessTokenTtl * 1000),
        }
    }

    private async signToken<T>(
        userId: number,
        expiresIn: number,
        payload?: T
    ) {
        return this.jwtService.signAsync(
            {
                sub: userId,
                ...payload
            },
            {
                secret: this.jwtConfiguration.secret,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                expiresIn
            }
        )
    }
}
