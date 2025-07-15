import { Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from '../dtos/sign-in.dto';
import { GenerateTokenProvider } from './generate-token.provider';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class SignInProvider {

    constructor(
        private readonly usersService: UsersService,

        private readonly hashingProvider: HashingProvider,

        private readonly generateTokenProvider: GenerateTokenProvider
    ) { }

    async signIn(signInDto: SignInDto) {
        const { email, password } = signInDto;

        const user = await this.usersService.findUserByEmail(email);

        if (!user) {
            throw new UnauthorizedException(`Email or password is incorrect!`);
        }

        let isPasswordCorrect: boolean = false

        try {
            isPasswordCorrect = await this.hashingProvider.comparePasswords(
                password,
                user.password
            )
        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: 'Password comparison timed out!'
            });
        }

        if (!isPasswordCorrect) {
            throw new UnauthorizedException(`Email or password is incorrect!`);
        }

        const { accessToken, refreshToken, accessTokenExpiredTime } = await this.generateTokenProvider.generateAccessToken(user);

        if (!accessToken || !refreshToken) {
            throw new UnauthorizedException(`Failed to generate access or refresh token!`);
        };

        const responseObject = {
            accessToken,
            roles: user.roles?.map(role => role.name) || [],
            expiredAt: accessTokenExpiredTime,
            refreshToken
        };

        // res.cookie("_jwt", JSON.stringify(responseObject), {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        //     sameSite: 'strict',
        //     path: '/'
        // });

        return responseObject;
    }
}
