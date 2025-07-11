import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class FindUserByEmailProvider {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async findByEmail(email: string): Promise<User | null> {

        let user: User | null = null;

        try {
            user = await this.userRepository.findOne({
                where: {
                    email
                }
            })
        } catch (error) {
            throw new RequestTimeoutException('Database request timed out!');
        }

        return user;
    }
}
