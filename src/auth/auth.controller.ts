import { Body, ClassSerializerInterceptor, Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthTypes } from './decorators/auth.decorator';
import { SignInDto } from './dtos/sign-in.dto';
import { AuthType } from './enum/auth-types.enum';

@AuthTypes(AuthType.None)
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('sign-in')
    signIn(
        @Body() signInDto: SignInDto,
    ) {
        return this.authService.signIn(signInDto);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('refresh-token')
    refreshToken(
        @Query('refreshToken') refreshToken: string,
    ) {
        return this.authService.refreshToken(refreshToken);
    }
}
