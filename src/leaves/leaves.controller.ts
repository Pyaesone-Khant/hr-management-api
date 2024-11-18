import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateLeaveDto } from './dtos/create-leave.dto';
import { LeaveStatus } from './enums/leave-status.enum';
import { LeavesService } from './providers/leaves.service';

@Controller('leaves')
export class LeavesController {

    constructor(
        private readonly leavesService: LeavesService
    ) { }

    @Get()
    findAll(
        @Query('status') status?: LeaveStatus,
    ) {
        return this.leavesService.findAll(status)
    }

    @Post()
    create(
        @Body() createLeaveDto: CreateLeaveDto
    ) {
        return this.leavesService.create(createLeaveDto)
    }

    @Get(':id')
    findOne(
        @Param('id') id: number
    ) {
        return this.leavesService.findOne(id)
    }

    @Patch(':id')
    approve(
        @Param('id') id: number,
        @Body() payload: { status: LeaveStatus }
    ) {
        return this.leavesService.updateStatus(id, payload.status)
    }

    @Delete(':id')
    remove(
        @Param('id') id: number
    ) {
        return this.leavesService.remove(id)
    }
}
