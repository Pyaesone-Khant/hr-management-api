import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { handleException } from 'src/helpers/exception-handler.helper';
import { Repository } from 'typeorm';
import { CreateLeaveDto } from '../dtos/create-leave.dto';
import { LeaveStatus } from '../enums/leave-status.enum';
import { Leave } from '../leave.entity';
import { CreateLeaveProvider } from './create-leave.provider';
import { UpdateLeaveStatusProvider } from './update-leave-status.provider';

@Injectable()
export class LeavesService {

    constructor(
        @InjectRepository(Leave)
        private readonly leaveRepository: Repository<Leave>,

        private readonly createLeaveProvider: CreateLeaveProvider,

        private readonly updateLeaveStatusProvider: UpdateLeaveStatusProvider
    ) { }

    async findAll(status?: LeaveStatus): Promise<Leave[]> {
        let leaves: Leave[] | [];

        let isStatusValid = Object.values(LeaveStatus).includes(status)

        try {
            if (isStatusValid) {
                leaves = await this.leaveRepository.find({
                    where: { status },
                    relations: [
                        'employee'
                    ]
                })
            } else {
                leaves = await this.leaveRepository.find({
                    relations: [
                        'employee'
                    ]
                })
            }
        } catch (error) {
            handleException(408);
        }

        return leaves;
    }

    async findOne(id: number): Promise<Leave> {
        let leave: Leave;

        try {
            leave = await this.leaveRepository.findOne({
                where: { id }
            });
        } catch (error) {
            handleException(408);
        }

        if (!leave) {
            handleException(404);
        }

        return leave;
    }

    async create(createLeaveDto: CreateLeaveDto) {
        return await this.createLeaveProvider.create(createLeaveDto)
    }

    async updateStatus(id: number, status: LeaveStatus): Promise<Leave> {
        return await this.updateLeaveStatusProvider.updateStatus(id, status);
    }

    async remove(id: number): Promise<object> {
        await this.findOne(id);

        try {
            await this.leaveRepository.delete(id);
        } catch (error) {
            handleException(408);
        }

        return {
            message: "Leave removed successfully"
        }
    }
}
