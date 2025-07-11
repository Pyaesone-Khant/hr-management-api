import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserByEmailProvider } from './providers/find-user-by-email.provider';

@Injectable()
export class UsersService {

    constructor(
        private readonly findUserByEmailProvider: FindUserByEmailProvider,
    ) { }

    async createUser(createUserDto: CreateUserDto) {
        return createUserDto;
    }

    async findUserByEmail(email: string) {
        return this.findUserByEmailProvider.findByEmail(email);
    }
}
