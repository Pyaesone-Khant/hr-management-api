import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class FindUserByPhoneProvider {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async findByPhone(phone: string): Promise<User | null> {
        let user: User | null = null;

        try {
            user = await this.userRepository.findOne({
                where: {
                    phone
                }
            });
        } catch (error) {
            throw new RequestTimeoutException('Database request timed out!');
        }

        return user;
    }
}
