import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/departments/department.entity';
import { DepartmentsService } from 'src/departments/providers/departments.service';
import { handleException } from 'src/helpers/exception-handler.helper';
import { Position } from 'src/positions/position.entity';
import { PositionsService } from 'src/positions/providers/positions.service';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { Employee } from '../employee.entity';

@Injectable()
export class CreateEmployeeProvider {

    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>,

        private readonly departmentsService: DepartmentsService,

        private readonly positionsService: PositionsService,
    ) { }

    async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        let employee: Employee | undefined;

        let department: Department = await this.departmentsService.findOne(createEmployeeDto.departmentId);

        let position: Position = await this.positionsService.findOne(createEmployeeDto.positionId);

        try {
            employee = this.employeeRepository.create(createEmployeeDto);
            employee.department = department;
            employee.position = position;
            await this.employeeRepository.save(employee);
        } catch (error) {
            handleException(408)
        }

        return employee;
    }

}
