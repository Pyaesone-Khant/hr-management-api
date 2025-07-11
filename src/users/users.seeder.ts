import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { RoleEnum } from 'src/roles/enums/role.enum';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersSeeder implements OnApplicationBootstrap {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly hashingProvider: HashingProvider,
    ) { }

    async onApplicationBootstrap() {
        const isSuperAdminExists = await this.userRepository.findOne({
            where: {
                roles: {
                    name: RoleEnum.SUPER_ADMIN
                }
            }
        })

        if (!isSuperAdminExists) {

            const hashPassword = await this.hashingProvider.hashPassword('superadmin123');

            const superAdmin = this.userRepository.create({
                name: 'Super Admin',
                email: "superadmin123@gmail.com",
                password: hashPassword,
                roles: [{
                    name: RoleEnum.SUPER_ADMIN
                }]
            });

            await this.userRepository.save(superAdmin);
            console.log('Super Admin user created successfully');
        };
    }
}
