import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/departments/department.entity';
import { DepartmentsService } from 'src/departments/providers/departments.service';
import { handleException } from 'src/helpers/exception-handler.helper';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { Employee } from '../employee.entity';

@Injectable()
export class CreateEmployeeProvider {

    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>,

        private readonly departmentsService: DepartmentsService
    ) { }

    async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        let employee: Employee | undefined;

        let department: Department = await this.departmentsService.findOne(createEmployeeDto.departmentId);

        try {
            employee = this.employeeRepository.create(createEmployeeDto);
            employee.department = department;
            await this.employeeRepository.save(employee);
        } catch (error) {
            handleException(408)
        }

        return employee;
    }

}
