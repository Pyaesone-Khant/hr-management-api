import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateLeaveDto } from './dtos/create-leave.dto';
import { LeavesService } from './providers/leaves.service';

@Controller('leaves')
export class LeavesController {

    constructor(
        private readonly leavesService: LeavesService
    ) { }

    @Get()
    findAll() {
        return this.leavesService.findAll()
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

}
