import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RolesController } from './roles.controller';
import { RolesSeeder } from './roles.seeder';
import { RolesService } from './roles.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Role
        ])
    ],
    controllers: [
        RolesController
    ],
    providers: [
        RolesService,
        RolesSeeder
    ],
    exports: [
        RolesService,
        RolesSeeder
    ]
})
export class RolesModule { }
