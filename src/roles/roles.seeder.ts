import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEnum } from './enums/role.enum';
import { Role } from './role.entity';

@Injectable()
export class RolesSeeder implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ) { }

    async onApplicationBootstrap() {
        const rolesToSeed = Object.values(RoleEnum);

        for (const roleName of rolesToSeed) {
            const existingRole = await this.roleRepository.findOne({
                where: {
                    name: roleName
                }
            });
            if (!existingRole) {
                const newRole = this.roleRepository.create({
                    name: roleName
                });
                await this.roleRepository.save(newRole);
            }
        }

        console.log('Roles seeded successfully!');
    }
}
