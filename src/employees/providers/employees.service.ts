import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { handleException } from 'src/helpers/exception-handler.helper';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { UpdateEmployeeDto } from '../dtos/update-employee.dto';
import { Employee } from '../employee.entity';
import { CreateEmployeeProvider } from './create-employee.provider';
import { UpdateEmployeeProvider } from './update-employee.provider';

@Injectable()
export class EmployeesService {

    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>,

        private readonly createEmployeeProvider: CreateEmployeeProvider,

        private readonly updateEmployeeProvider: UpdateEmployeeProvider
    ) { }

    async findAll(): Promise<Employee[]> {

        let employees: Employee[] | [];

        try {
            employees = await this.employeeRepository.find();
        } catch (error) {
            handleException(408)
        }

        return employees;
    }

    async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        return await this.createEmployeeProvider.createEmployee(createEmployeeDto);
    }

    async findOne(id: number): Promise<Employee> {
        let employee: Employee;

        try {
            employee = await this.employeeRepository.findOne({
                where: { id },
                relations: [
                    'leaves'
                ]
            });
        } catch (error) {
            handleException(408)
        }

        if (!employee) {
            handleException(404, "Employee not found!")
        }

        return employee;
    }

    async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
        return await this.updateEmployeeProvider.updateEmployee(id, updateEmployeeDto);
    }

    async remove(id: number): Promise<{}> {
        await this.findOne(id);

        try {
            await this.employeeRepository.delete(id);
        } catch (error) {
            handleException(408)
        }

        return { message: "Employee deleted successfully!" };
    }

}
