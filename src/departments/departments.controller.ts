import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { UpdateDepartmentDto } from './dtos/update-department.dto';
import { DepartmentsService } from './providers/departments.service';

@Controller('departments')
export class DepartmentsController {

    constructor(
        private readonly deparmentsService: DepartmentsService,
    ) { }

    @Get()
    findAll(
        @Req() req: Request
    ) {

        const cookies = req.cookies;

        console.log(cookies)

        return this.deparmentsService.findAll();
    }

    @Post()
    create(
        @Body() createDepartmentDto: CreateDepartmentDto
    ) {
        return this.deparmentsService.create(createDepartmentDto);
    }

    @Get(':id')
    findOne(
        @Param('id') id: number
    ) {
        return this.deparmentsService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() updateDepartmentDto: UpdateDepartmentDto
    ) {
        return this.deparmentsService.update(id, updateDepartmentDto);
    }

    @Delete(':id')
    remove(
        @Param('id') id: number
    ) {
        return this.deparmentsService.remove(id);
    }
}
