import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { handleException } from 'src/helpers/exception-handler.helper';
import { Repository } from 'typeorm';
import { Department } from '../department.entity';

@Injectable()
export class FindDepartmentBySlugProvider {

    constructor(
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>
    ) { }

    async findDepartmentBySlug(slug: string): Promise<Department> {

        let department: Department | undefined;

        try {
            department = await this.departmentRepository.findOne({
                where: {
                    slug
                }
            })
        } catch (error) {
            handleException(408)
        }
        return department;
    }
}
