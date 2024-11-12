import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './providers/departments.service';
import { FindDepartmentBySlugProvider } from './providers/find-department-by-slug.provider';

@Module({
    controllers: [DepartmentsController],
    providers: [DepartmentsService, FindDepartmentBySlugProvider],
    imports: [
        TypeOrmModule.forFeature([
            Department
        ])
    ]
})
export class DepartmentsModule { }
