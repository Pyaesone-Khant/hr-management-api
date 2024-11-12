import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataResponseInterceptor } from './common/data-response.interceptor';
import { FindDataBySlugProvider } from './common/providers/find-data-by-slug.provider';
import appConfig from './configs/app.config';
import databaseConfig from './configs/database.config';
import environmentValidation from './configs/environment.validation';
import { DepartmentsModule } from './departments/departments.module';
import { EmployeePositionsModule } from './employee-positions/employee-positions.module';
import { EmployeesModule } from './employees/employees.module';
import { LeaveTypesModule } from './leave-types/leave-types.module';
import { LeavesModule } from './leaves/leaves.module';
import { PositionsModule } from './positions/positions.module';

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
        PositionsModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: DataResponseInterceptor
        },
        FindDataBySlugProvider
    ],
    exports: [
        FindDataBySlugProvider
    ]
})
export class AppModule { }
