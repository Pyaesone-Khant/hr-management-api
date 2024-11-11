import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './configs/app.config';
import databaseConfig from './configs/database.config';
import environmentValidation from './configs/environment.validation';
import { DepartmentsModule } from './departments/departments.module';
import { EmployeePositionsModule } from './employee-positions/employee-positions.module';
import { EmployeesModule } from './employees/employees.module';
import { LeaveTypesModule } from './leave-types/leave-types.module';
import { LeavesModule } from './leaves/leaves.module';

const ENV = process.env.NODE_ENV;
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
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
