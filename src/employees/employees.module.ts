import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsModule } from 'src/departments/departments.module';
import { LeaveTypesModule } from 'src/leave-types/leave-types.module';
import { LeavesModule } from 'src/leaves/leaves.module';
import { PositionsModule } from 'src/positions/positions.module';
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
        DepartmentsModule,
        PositionsModule,
        LeaveTypesModule,
        forwardRef(() => LeavesModule)
    ],
    exports: [
        EmployeesService
    ]
})
export class EmployeesModule { }
