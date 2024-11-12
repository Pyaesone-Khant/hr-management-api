import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from 'src/employees/employees.module';
import { LeaveTypesModule } from 'src/leave-types/leave-types.module';
import { Leave } from './leave.entity';
import { LeavesController } from './leaves.controller';
import { CreateLeaveProvider } from './providers/create-leave.provider';
import { LeavesService } from './providers/leaves.service';

@Module({
    controllers: [LeavesController],
    providers: [LeavesService, CreateLeaveProvider],
    imports: [
        TypeOrmModule.forFeature([
            Leave
        ]),
        LeaveTypesModule,
        EmployeesModule
    ]
})
export class LeavesModule { }
