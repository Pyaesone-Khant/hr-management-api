import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/configs/jwt.config';
import { RefreshTokensModule } from 'src/refresh-tokens/refresh-tokens.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptProvider } from './providers/bcrypt.provider';
import { GenerateTokenProvider } from './providers/generate-token.provider';
import { HashingProvider } from './providers/hashing.provider';
import { RefreshTokenProvider } from './providers/refresh-token.provider';
import { SignInProvider } from './providers/sign-in.provider';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider()),
        RefreshTokensModule
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        SignInProvider,
        {
            provide: HashingProvider,
            useClass: BcryptProvider
        },
        GenerateTokenProvider,
        RefreshTokenProvider
    ],
    exports: [
        AuthService,
        HashingProvider
    ]
})
export class AuthModule { }
