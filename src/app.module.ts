import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';
import { LeavesModule } from './leaves/leaves.module';
import { EmployeePositionsModule } from './employee-positions/employee-positions.module';
import { LeaveTypesModule } from './leave-types/leave-types.module';

@Module({
  imports: [EmployeesModule, DepartmentsModule, LeavesModule, EmployeePositionsModule, LeaveTypesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
