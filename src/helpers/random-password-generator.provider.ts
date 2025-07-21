import { Injectable } from '@nestjs/common';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class RandomPasswordGeneratorProvider {

    private static readonly DEFAULT_PASSWORD_LENGTH = 12;
    private static readonly CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';

    constructor(
        private readonly hashingProvider: HashingProvider
    ) { }

    async generatePassword(
        length: number = RandomPasswordGeneratorProvider.DEFAULT_PASSWORD_LENGTH
    ): Promise<{ password: string, hashedPassword: string }> {
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * RandomPasswordGeneratorProvider.CHARSET.length);
            password += RandomPasswordGeneratorProvider.CHARSET[randomIndex];
        }

        const hashedPassword = await this.hashingProvider.hashPassword(password);

        return {
            password,
            hashedPassword
        }
    }

}
