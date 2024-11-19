import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LeaveTypesService } from 'src/leave-types/providers/leave-types.service';
import { Repository } from 'typeorm';
import { Leave } from '../leave.entity';

@Injectable()
export class GetLeaveBalanceProvider {

    constructor(
        @InjectRepository(Leave)
        private readonly leaveRepository: Repository<Leave>,

        private readonly leaveTypesService: LeaveTypesService,
    ) { }

    public async getLeaveBalanceByEmployeeId(employeeId: number): Promise<any> {
        let leaveTypes = await this.leaveTypesService.findAll();
        let leaveBalance: Record<string, number> = {};

        for (let leaveType of leaveTypes) {
            let totalTaken = await this.leaveRepository
                .createQueryBuilder('leave')
                .where('leave.employee.id = :employeeId', { employeeId })
                .andWhere('leave.leaveType.id = :leaveTypeId', { leaveTypeId: leaveType.id })
                .getRawOne();

            leaveBalance[leaveType.name] = leaveType.totalDays;
        }

        return leaveBalance;
    }

    public async getTotalLeaveTakenByEmployee(employeeId: number) {
        let result = await this.leaveRepository
            .createQueryBuilder('leave')
            .where('leave.employee.id = :employeeId', { employeeId })
            .select('SUM(DATE_PART(\'day\', leave.endDate - leave.startDate) + 1)', 'totalTaken')
            .getRawOne();

        return result?.totalTaken || 0;
    }
}
