import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsModule } from 'src/departments/departments.module';
import { Employee } from './employee.entity';
import { EmployeesController } from './employees.controller';
import { CreateEmployeeProvider } from './providers/create-employee.provider';
import { EmployeesService } from './providers/employees.service';
import { UpdateEmployeeProvider } from './providers/update-employee.provider';

@Module({
    controllers: [EmployeesController],
    providers: [EmployeesService, CreateEmployeeProvider, UpdateEmployeeProvider],
    imports: [
        TypeOrmModule.forFeature([
            Employee
        ]),
        DepartmentsModule
    ],
    exports: [
        EmployeesService
    ]
})
export class EmployeesModule { }
