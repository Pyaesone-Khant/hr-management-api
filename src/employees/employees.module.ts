import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './providers/employees.service';

@Module({
    controllers: [EmployeesController],
    providers: [EmployeesService],
    imports: [
        TypeOrmModule.forFeature([
            Employee
        ])
    ]
})
export class EmployeesModule { }
