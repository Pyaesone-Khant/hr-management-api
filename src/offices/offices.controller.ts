import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateOfficeDto } from './dtos/create-office.dto';
import { OfficesService } from './offices.service';

@Controller('offices')
export class OfficesController {

    constructor(
        private readonly officesService: OfficesService
    ) { }

    @Get()
    async findAll() {
        return this.officesService.findAll();
    }

    @Get(':id')
    async findOne(id: number) {
        return this.officesService.findOne(id);
    }

    @Post()
    async create(
        @Body() createOfficeDto: CreateOfficeDto
    ) {
        return this.officesService.create(createOfficeDto);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateOfficeDto: CreateOfficeDto
    ) {
        return this.officesService.update(id, updateOfficeDto);
    }

    @Delete(':id')
    async remove(
        @Param('id') id: number
    ) {
        return this.officesService.remove(id);
    }
}
