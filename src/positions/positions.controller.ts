import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePositionDto } from './dtos/create-position.dto';
import { PositionsService } from './providers/positions.service';

@Controller('positions')
export class PositionsController {

    constructor(
        private readonly positionsService: PositionsService
    ) { }

    @Get()
    findAll() {
        return this.positionsService.findAll();
    }

    @Post()
    create(
        @Body() createPositionDto: CreatePositionDto
    ) {
        return this.positionsService.create(createPositionDto)
    }

    @Get(':id')
    findOne(
        @Param('id') id: number
    ) {
        return this.positionsService.findOne(id)
    }

    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() updatePositionDto: CreatePositionDto
    ) {
        return this.positionsService.update(id, updatePositionDto)
    }

    @Delete(':id')
    remove(
        @Param('id') id: number
    ) {
        return this.positionsService.remove(id)
    }
}
