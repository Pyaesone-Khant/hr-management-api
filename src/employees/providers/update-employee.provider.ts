import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/departments/department.entity';
import { DepartmentsService } from 'src/departments/providers/departments.service';
import { handleException } from 'src/helpers/exception-handler.helper';
import { Repository } from 'typeorm';
import { UpdateEmployeeDto } from '../dtos/update-employee.dto';
import { Employee } from '../employee.entity';

@Injectable()
export class UpdateEmployeeProvider {
    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>,

        private readonly departmentsService: DepartmentsService
    ) { }

    async createEmployee(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
        let employee: Employee | undefined;

        employee = await this.employeeRepository.findOne({
            where: { id }
        })

        if (!employee) {
            handleException(404, "Employee not found!")
        }

        let department: Department = await this.departmentsService.findOne(updateEmployeeDto.departmentId);

        employee.name = updateEmployeeDto.name ?? employee.name;
        employee.email = updateEmployeeDto.email ?? employee.email;
        employee.dob = updateEmployeeDto.dob ?? employee.dob;
        employee.address = updateEmployeeDto.address ?? employee.address;
        employee.mobileNumber = updateEmployeeDto.mobileNumber ?? employee.mobileNumber;
        employee.startDate = updateEmployeeDto.startDate ?? employee.startDate;
        employee.endDate = updateEmployeeDto.endDate ?? employee.endDate;
        employee.employmentStatus = updateEmployeeDto.employmentStatus ?? employee.employmentStatus;
        employee.department = department;

        try {
            await this.employeeRepository.save(employee);
        } catch (error) {
            handleException(408)
        }

        return employee;
    }
}
