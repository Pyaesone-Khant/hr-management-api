import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { handleException } from 'src/helpers/exception-handler.helper';
import { Repository } from 'typeorm';
import { LeaveStatus } from '../enums/leave-status.enum';
import { Leave } from '../leave.entity';

@Injectable()
export class UpdateLeaveStatusProvider {
    constructor(
        @InjectRepository(Leave)
        private readonly leaveRepository: Repository<Leave>
    ) { }

    async updateStatus(id: number, status: LeaveStatus): Promise<Leave> {
        let leave: Leave = await this.leaveRepository.findOne({
            where: { id }
        });

        if (!leave) {
            handleException(404)
        }

        let isStatusValid = Object.values(LeaveStatus).includes(status);

        if (!isStatusValid) {
            handleException(400, 'Invalid status provided!');
        }

        if (leave.status === LeaveStatus.APPROVED && this.isLeaveApprovedOrRejected(status)) {
            handleException(400, 'Cannot approve or reject an approved leave request!');
        }

        if (leave.status === LeaveStatus.REJECTED && this.isLeaveApprovedOrRejected(status)) {
            handleException(400, 'Cannot approve or reject a rejected leave request!');
        }

        if (leave.status === LeaveStatus.CANCELED && this.isLeaveApprovedOrRejected(status)) {
            handleException(400, 'Cannot approve or reject a canceled leave request!');
        }

        leave.status = status;

        await this.leaveRepository.save(leave);

        return leave;
    }

    private isLeaveApprovedOrRejected(status: LeaveStatus): boolean {
        return status === LeaveStatus.APPROVED || status === LeaveStatus.REJECTED;
    }
}
