import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserByEmailProvider } from './providers/find-user-by-email.provider';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly findUserByEmailProvider: FindUserByEmailProvider,
    ) { }

    async findAll(): Promise<User[]> {
        let users: User[];

        try {
            users = await this.userRepository.find();
        } catch (error) {
            throw new RequestTimeoutException("Request timed out while trying to find users");
        }

        return users;
    }

    async createUser(createUserDto: CreateUserDto) {
        return createUserDto;
    }

    async findUserByEmail(email: string) {
        return this.findUserByEmailProvider.findByEmail(email);
    }

    async findOne(id: number): Promise<User> {
        let user: User;

        try {
            user = await this.userRepository.findOne({
                where: {
                    id
                }
            })
        } catch (error) {
            throw new RequestTimeoutException("Request timed out while trying to find user");
        }

        return user;
    }
}
