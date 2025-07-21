import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { handleException } from 'src/helpers/exception-handler.helper';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserStatus } from './enum/user-status.enum';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindUserByEmailProvider } from './providers/find-user-by-email.provider';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly findUserByEmailProvider: FindUserByEmailProvider,

        private readonly createUserProvider: CreateUserProvider
    ) { }

    async findAll(
        status: string = UserStatus.ACTIVE
    ): Promise<User[]> {
        let users: User[];

        try {
            users = await this.userRepository.find({
                where: {
                    isActive: status === UserStatus.ACTIVE,
                }
            });
        } catch (error) {
            throw new RequestTimeoutException("Request timed out while trying to find users");
        }

        return users;
    }

    async createUser(createUserDto: CreateUserDto) {
        return this.createUserProvider.createUser(createUserDto);
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

    async remove(id: number): Promise<{ success: boolean, message?: string }> {
        let user: User;

        user = await this.findOne(id);

        if (!user) {
            handleException(404, "User not found");
        }

        user.isActive = false;
        user.phone = "d-" + user.phone;
        user.email = "d-" + user.email;

        try {
            await this.userRepository.save(user);
        } catch (error) {
            handleException(408, "Request timed out while trying to remove user");
        }

        return {
            success: true,
            message: "User removed successfully!"
        };

    }
}
