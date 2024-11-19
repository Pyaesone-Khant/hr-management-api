import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/departments/department.entity';
import { DepartmentsService } from 'src/departments/providers/departments.service';
import { handleException } from 'src/helpers/exception-handler.helper';
import { LeaveType } from 'src/leave-types/leave-type.entity';
import { LeaveTypesService } from 'src/leave-types/providers/leave-types.service';
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

        private readonly leaveTypesService: LeaveTypesService
    ) { }

    async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        let employee: Employee | undefined;

        let department: Department = await this.departmentsService.findOne(createEmployeeDto.departmentId);

        let position: Position = await this.positionsService.findOne(createEmployeeDto.positionId);

        let leaveTypes: LeaveType[] = await this.leaveTypesService.findAll();

        try {
            employee = this.employeeRepository.create(createEmployeeDto);
            employee.department = department;
            employee.position = position;
            employee.leaveTypes = leaveTypes;
            await this.employeeRepository.save(employee);
        } catch (error) {
            handleException(408)
        }

        return employee;
    }

}
