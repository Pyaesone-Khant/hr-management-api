import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { EmployeesService } from './providers/employees.service';

@Controller('employees')
export class EmployeesController {

    constructor(
        private readonly employeesService: EmployeesService
    ) { }

    @Get()
    findAll() {
        return this.employeesService.findAll();
    }

    @Post()
    create(
        @Body() createEmployeeDto: CreateEmployeeDto
    ) {
        return this.employeesService.create(createEmployeeDto);
    }

    @Get(':id')
    findOne(
        @Param('id') id: number
    ) {
        return this.employeesService.findOne(id);
    }

    @Get(':id/leave-balance')
    getLeaveBalance(
        @Param('id') id: number
    ) {
        return this.employeesService.getLeaveBalance(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() updateEmployeeDto: UpdateEmployeeDto
    ) {
        return this.employeesService.update(id, updateEmployeeDto);
    }

    @Delete(':id')
    remove(
        @Param('id') id: number
    ) {
        return this.employeesService.remove(id);
    }

}
