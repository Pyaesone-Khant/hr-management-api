import { Injectable } from '@nestjs/common';
import { SignInDto } from './dtos/sign-in.dto';
import { RefreshTokenProvider } from './providers/refresh-token.provider';
import { SignInProvider } from './providers/sign-in.provider';

@Injectable()
export class AuthService {

    constructor(
        private readonly signInProvider: SignInProvider,

        private readonly refreshTokenProvider: RefreshTokenProvider
    ) { }

    async signIn(signInDto: SignInDto) {
        return this.signInProvider.signIn(signInDto);
    }

    async refreshToken(refreshToken: string) {
        return this.refreshTokenProvider.generateRefreshToken(refreshToken);
    }
}
