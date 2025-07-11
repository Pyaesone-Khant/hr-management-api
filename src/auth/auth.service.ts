import { Injectable } from '@nestjs/common';
import { SignInDto } from './dtos/sign-in.dto';
import { SignInProvider } from './providers/sign-in.provider';

@Injectable()
export class AuthService {

    constructor(
        private readonly signInProvider: SignInProvider
    ) { }

    async signIn(signInDto: SignInDto) {
        return this.signInProvider.signIn(signInDto);
    }
}
