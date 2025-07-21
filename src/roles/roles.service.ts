import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEnum } from './enums/role.enum';
import { Role } from './role.entity';

@Injectable()
export class RolesService {

    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ) { }

    async findAll(): Promise<Role[]> {
        return this.roleRepository.find();
    }

    async findByName(name: RoleEnum): Promise<Role | null> {
        let role: Role | null = null;

        try {
            role = await this.roleRepository.findOne({
                where: { name }
            });
        } catch (error) {
            throw new RequestTimeoutException('Database request timed out!');
        }

        return role;
    }
}
