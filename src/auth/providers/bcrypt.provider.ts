import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class BcryptProvider extends HashingProvider {

    private readonly saltRounds = 10;

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async comparePasswords(password: string, hashedPassword: string | Buffer): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword as string);
    }

}
