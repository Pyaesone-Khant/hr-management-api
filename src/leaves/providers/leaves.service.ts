import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { handleException } from 'src/helpers/exception-handler.helper';
import { Repository } from 'typeorm';
import { CreateLeaveDto } from '../dtos/create-leave.dto';
import { Leave } from '../leave.entity';
import { CreateLeaveProvider } from './create-leave.provider';

@Injectable()
export class LeavesService {

    constructor(
        @InjectRepository(Leave)
        private readonly leaveRepository: Repository<Leave>,

        private readonly createLeaveProvider: CreateLeaveProvider
    ) { }

    async findAll(): Promise<Leave[]> {
        let leaves: Leave[] | [];

        try {
            leaves = await this.leaveRepository.find({
                relations: [
                    'employee',
                ]
            });
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

    async update(id: number, updateLeaveDto: CreateLeaveDto): Promise<Leave> {
        let leave: Leave = await this.findOne(id);

        if (!leave) {
            handleException(404);
        }

        leave.reason = updateLeaveDto.reason ?? leave.reason;
        leave.description = updateLeaveDto.description ?? leave.description;
        leave.startDate = updateLeaveDto.startDate ?? leave.startDate;
        leave.endDate = updateLeaveDto.endDate ?? leave.endDate;

        try {
            await this.leaveRepository.save(leave);
        } catch (error) {
            handleException(408);
        }

        return leave;
    }
}
