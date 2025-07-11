import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersSeeder } from './users.seeder';
import { UsersService } from './users.service';
import { FindUserByEmailProvider } from './providers/find-user-by-email.provider';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User
        ]),
        forwardRef(() => AuthModule) // Assuming AuthModule is defined in src/auth/auth.module.ts
    ],
    controllers: [
        UsersController
    ],
    providers: [
        UsersService,
        UsersSeeder,
        FindUserByEmailProvider
    ],
    exports: [
        UsersService,
        UsersSeeder
    ]
})
export class UsersModule { }
