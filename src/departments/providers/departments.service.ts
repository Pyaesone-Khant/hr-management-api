import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindDataBySlugProvider } from 'src/common/providers/find-data-by-slug.provider';
import { handleException } from 'src/helpers/exception-handler.helper';
import { Position } from 'src/positions/position.entity';
import { PositionsService } from 'src/positions/providers/positions.service';
import { Repository } from 'typeorm';
import { Department } from '../department.entity';
import { CreateDepartmentDto } from '../dtos/create-department.dto';
import { UpdateDepartmentDto } from '../dtos/update-department.dto';

@Injectable()
export class DepartmentsService {

    constructor(
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>,

        private readonly findDataBySlugProvider: FindDataBySlugProvider,

        private readonly positionsService: PositionsService
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
        let positions: Position[] | [];

        let newDepartment: Department | undefined = await this.findDataBySlugProvider.findDataBySlug(this.departmentRepository, createDepartmentDto.slug)

        if (newDepartment) {
            handleException(409);
        }

        if (createDepartmentDto.positions && createDepartmentDto.positions.length > 0) {
            positions = await this.positionsService.findPositions(createDepartmentDto.positions);
        }


        try {
            department = this.departmentRepository.create({ ...createDepartmentDto, positions });
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
                where: { id },
                relations: ['positions']
            });
        } catch (error) {
            handleException(408)
        }

        if (!department) {
            handleException(404);
        }

        return department;
    }

    async update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {

        let department: Department | undefined = await this.findOne(id);
        let departmentWithSlug: Department | undefined = await this.findDataBySlugProvider.findDataBySlug(this.departmentRepository, updateDepartmentDto.slug);

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

        await this.findOne(id);

        try {
            await this.departmentRepository.delete(id);
        } catch (error) {
            handleException(408)
        }

        return { message: "Department deleted successfully!" };
    }
}
