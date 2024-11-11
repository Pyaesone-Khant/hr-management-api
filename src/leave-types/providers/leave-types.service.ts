import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { handleException } from 'src/helpers/exception-handler.helper';
import { Repository } from 'typeorm';
import { CreateLeaveTypeDto } from '../dtos/create-leave-type.dto';
import { UpdateLeaveTypeDto } from '../dtos/update-leave-type.dto';
import { LeaveType } from '../leave-type.entity';

@Injectable()
export class LeaveTypesService {

    constructor(
        @InjectRepository(LeaveType)
        private readonly leaveTypeRepository: Repository<LeaveType>,
    ) { }

    public async findAll(): Promise<LeaveType[]> {

        let leaveTypes: LeaveType[] | [];

        try {
            leaveTypes = await this.leaveTypeRepository.find();
        } catch (error) {
            handleException(408)
        }

        return leaveTypes;
    }

    public async create(createLeaveTypeDto: CreateLeaveTypeDto): Promise<LeaveType> {
        let leaveType: LeaveType | undefined;

        try {
            leaveType = this.leaveTypeRepository.create(createLeaveTypeDto);
            await this.leaveTypeRepository.save(leaveType);
        } catch (error) {
            handleException(408)
        }

        if (!leaveType) {
            handleException(500)
        }

        return leaveType;
    }

    public async findOne(id: number): Promise<LeaveType> {
        let leaveType: LeaveType | undefined;

        try {
            leaveType = await this.leaveTypeRepository.findOne({
                where: { id }
            });
        } catch (error) {
            handleException(408)
        }

        if (!leaveType) {
            handleException(404)
        }

        return leaveType;
    }

    public async update(id: number, updateLeaveTypeDto: UpdateLeaveTypeDto): Promise<LeaveType> {
        let leaveType: LeaveType | undefined;

        try {
            leaveType = await this.findOne(id);

            if (!leaveType) {
                handleException(404)
            }

            leaveType = this.leaveTypeRepository.create(updateLeaveTypeDto);
            await this.leaveTypeRepository.update(id, leaveType);
        } catch (error) {
            handleException(408)
        }

        if (!leaveType) {
            handleException(500)
        }

        return leaveType;
    }

    public async remove(id: number): Promise<object> {
        await this.findOne(id);

        try {
            await this.leaveTypeRepository.delete(id)
        } catch (error) {
            handleException(408)
        }

        return {
            message: "Delete successfully!"
        }
    }
}
