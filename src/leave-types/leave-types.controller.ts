import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateLeaveTypeDto } from './dtos/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dtos/update-leave-type.dto';
import { LeaveTypesService } from './providers/leave-types.service';

@Controller('leave-types')
export class LeaveTypesController {

    constructor(
        private readonly leaveTypeService: LeaveTypesService,
    ) { }

    @Get()
    findAll() {
        return this.leaveTypeService.findAll()
    }

    @Get(':id')
    findOne(
        @Param('id') id: number
    ) {
        return this.leaveTypeService.findOne(id)
    }

    @Post()
    create(
        @Body() createLeaveTypeDto: CreateLeaveTypeDto
    ) {
        return this.leaveTypeService.create(createLeaveTypeDto)
    }

    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() updateLeaveTypeDto: UpdateLeaveTypeDto
    ) {
        return this.leaveTypeService.update(id, updateLeaveTypeDto)
    }

    @Delete(':id')
    remove(
        @Param('id') id: number
    ) {
        return this.leaveTypeService.remove(id)
    }


}
