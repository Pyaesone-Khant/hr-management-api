import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { handleException } from 'src/helpers/exception-handler.helper';
import { Repository } from 'typeorm';
import { Department } from '../department.entity';
import { CreateDepartmentDto } from '../dtos/create-department.dto';
import { UpdateDepartmentDto } from '../dtos/update-department.dto';
import { FindDepartmentBySlugProvider } from './find-department-by-slug.provider';

@Injectable()
export class DepartmentsService {

    constructor(
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>,

        private readonly findDepartmentBySlugProvider: FindDepartmentBySlugProvider
    ) { }

    async findAll(): Promise<Department[]> {

        let departments: Department[] | [];

        try {
            departments = await this.departmentRepository.find();
        } catch (error) {
            handleException(408)
        }

        return departments;
    }

    async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {

        let department: Department;

        let newDepartment = await this.findDepartmentBySlugProvider.findDepartmentBySlug(createDepartmentDto.slug);

        if (newDepartment) {
            handleException(409);
        }

        try {
            department = this.departmentRepository.create(createDepartmentDto);
            await this.departmentRepository.save(department);
        } catch (error) {
            handleException(408)
        }

        return department;
    }

    async findOne(id: number): Promise<Department> {

        let department: Department | undefined;

        try {
            department = await this.departmentRepository.findOne({
                where: { id }
            });
        } catch (error) {
            handleException(408)
        }

        if (!department) {
            handleException(404);
        }

        return department;
    }

    async update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<any> {

        let department: Department | undefined = await this.findOne(id);
        let departmentWithSlug: Department | undefined = await this.findDepartmentBySlugProvider.findDepartmentBySlug(updateDepartmentDto.slug);

        if (departmentWithSlug && departmentWithSlug.id !== id) {
            handleException(409, "Duplicate slug!");
        }

        department.name = updateDepartmentDto?.name ?? department.name;
        department.slug = updateDepartmentDto?.slug ?? department.slug;
        department.description = updateDepartmentDto?.description ?? department.description;

        try {
            await this.departmentRepository.save(department)
        } catch (error) {
            handleException(408)
        }

        return department;
    }

    async remove(id: number): Promise<object> {

        let department: Department | undefined;

        department = await this.findOne(id);

        try {
            await this.departmentRepository.delete(id);
        } catch (error) {
            handleException(408)
        }

        return { message: "Department deleted successfully!" };
    }
}
