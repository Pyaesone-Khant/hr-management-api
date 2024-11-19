import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from 'src/employees/employees.module';
import { LeaveTypesModule } from 'src/leave-types/leave-types.module';
import { Leave } from './leave.entity';
import { LeavesController } from './leaves.controller';
import { CreateLeaveProvider } from './providers/create-leave.provider';
import { GetLeaveBalanceProvider } from './providers/get-leave-balance.provider';
import { LeavesService } from './providers/leaves.service';
import { UpdateLeaveStatusProvider } from './providers/update-leave-status.provider';

@Module({
    controllers: [LeavesController],
    providers: [LeavesService, CreateLeaveProvider, UpdateLeaveStatusProvider, GetLeaveBalanceProvider],
    imports: [
        TypeOrmModule.forFeature([
            Leave
        ]),
        LeaveTypesModule,
        forwardRef(() => EmployeesModule)
    ],
    exports: [
        GetLeaveBalanceProvider
    ]
})
export class LeavesModule { }
