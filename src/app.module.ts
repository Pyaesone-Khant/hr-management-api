import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './auth/guards/access-token.guard';
import { AuthenticationGuard } from './auth/guards/authentication.guard';
import { DataResponseInterceptor } from './common/data-response.interceptor';
import { FindDataBySlugProvider } from './common/providers/find-data-by-slug.provider';
import appConfig from './configs/app.config';
import databaseConfig from './configs/database.config';
import environmentValidation from './configs/environment.validation';
import jwtConfig from './configs/jwt.config';
import { DepartmentsModule } from './departments/departments.module';
import { EmployeePositionsModule } from './employee-positions/employee-positions.module';
import { EmployeesModule } from './employees/employees.module';
import { LeaveTypesModule } from './leave-types/leave-types.module';
import { LeavesModule } from './leaves/leaves.module';
import { PositionsModule } from './positions/positions.module';
import { RefreshTokensModule } from './refresh-tokens/refresh-tokens.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

const ENV = process.env.NODE_ENV;
@Global()
@Module({
    imports: [
        EmployeesModule,
        DepartmentsModule,
        LeavesModule,
        EmployeePositionsModule,
        LeaveTypesModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: !ENV ? '.env' : `.env.${ENV}`,
            load: [
                appConfig,
                databaseConfig
            ],
            validationSchema: environmentValidation
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: "postgres",
                host: config.get('database.host'),
                port: config.get('database.port'),
                username: config.get('database.user'),
                password: config.get('database.password'),
                database: config.get('database.name'),
                synchronize: config.get('database.synchronize'),
                autoLoadEntities: config.get('database.autoLoadEntities'),
            })
        }),
        PositionsModule,
        AuthModule,
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider()),
        UsersModule,
        RolesModule,
        RefreshTokensModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: DataResponseInterceptor
        },
        {
            provide: APP_GUARD,
            useClass: AuthenticationGuard
        },
        FindDataBySlugProvider,
        AccessTokenGuard
    ],
    exports: [
        FindDataBySlugProvider
    ]
})
export class AppModule { }
