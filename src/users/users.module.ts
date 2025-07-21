import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DepartmentsModule } from 'src/departments/departments.module';
import { OfficesModule } from 'src/offices/offices.module';
import { PositionsModule } from 'src/positions/positions.module';
import { RolesModule } from 'src/roles/roles.module';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindUserByEmailProvider } from './providers/find-user-by-email.provider';
import { FindUserByPhoneProvider } from './providers/find-user-by-phone.provider';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersSeeder } from './users.seeder';
import { UsersService } from './users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User
        ]),
        forwardRef(() => AuthModule), // Assuming AuthModule is defined in src/auth/auth.module.ts,
        RolesModule,
        DepartmentsModule,
        PositionsModule,
        OfficesModule
    ],
    controllers: [
        UsersController
    ],
    providers: [
        UsersService,
        UsersSeeder,
        FindUserByEmailProvider,
        CreateUserProvider,
        FindUserByPhoneProvider
    ],
    exports: [
        UsersService,
        UsersSeeder
    ]
})
export class UsersModule { }
