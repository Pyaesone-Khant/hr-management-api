import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employees/employee.entity';
import { EmployeesService } from 'src/employees/providers/employees.service';
import { handleException } from 'src/helpers/exception-handler.helper';
import { LeaveType } from 'src/leave-types/leave-type.entity';
import { LeaveTypesService } from 'src/leave-types/providers/leave-types.service';
import { Repository } from 'typeorm';
import { CreateLeaveDto } from '../dtos/create-leave.dto';
import { Leave } from '../leave.entity';

@Injectable()
export class CreateLeaveProvider {

    constructor(
        @InjectRepository(Leave)
        private readonly leaveRepository: Repository<Leave>,

        private readonly leaveTypesService: LeaveTypesService,

        private readonly employeesService: EmployeesService
    ) { }

    async create(createLeaveDto: CreateLeaveDto) {

        let leave: Leave | undefined;

        let leaveType: LeaveType = await this.leaveTypesService.findOne(createLeaveDto.leaveTypeId);

        let employee: Employee = await this.employeesService.findOne(createLeaveDto.employeeId);

        await this.checkConsecutiveDays(createLeaveDto);

        await this.checkLeave(createLeaveDto);

        try {
            leave = this.leaveRepository.create({
                ...createLeaveDto,
                leaveType,
                employee
            });
            await this.leaveRepository.save(leave);
        } catch (error) {
            handleException(408);
        }
        return leave;
    }

    private async checkLeave(createLeaveDto: CreateLeaveDto) {
        let remainingLeaves = await this.remainingLeaves(createLeaveDto.employeeId, createLeaveDto.leaveTypeId);

        let leaveDays = this.calculateLeaveDays(createLeaveDto.startDate, createLeaveDto.endDate);

        if (remainingLeaves < leaveDays) {
            handleException(400, 'You do not have enough leaves!');
        }

        return true;
    }

    private async remainingLeaves(employeeId: number, leaveTypeId: number) {
        let employee: Employee = await this.employeesService.findOne(employeeId);
        let leaveType: LeaveType = await this.leaveTypesService.findOne(leaveTypeId);

        let leaves: Leave[] = await this.leaveRepository.find({
            where: {
                employee: employee,
                leaveType: leaveType
            }
        });

        let remainingLeaves: number = leaveType.totalDays - leaves.length;

        return remainingLeaves;
    }

    private async checkConsecutiveDays(createLeaveDto: CreateLeaveDto) {
        let leaveType: LeaveType = await this.leaveTypesService.findOne(createLeaveDto.leaveTypeId);

        let leaveDays = this.calculateLeaveDays(createLeaveDto.startDate, createLeaveDto.endDate);

        if (leaveDays > leaveType.takeableConsecDaysLimit) {
            handleException(400, 'You cannot take more than ' + leaveType.takeableConsecDaysLimit + ' consecutive days!');
        }

        return true;
    }

    private calculateLeaveDays(startDate: Date, endDate: Date) {
        let start = new Date(startDate);
        let end = new Date(endDate);

        let days = (end.getTime() - start.getTime()) / (1000 * 3600 * 24) + 1;

        return days;
    }

}
