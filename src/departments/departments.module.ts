import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './providers/departments.service';

@Module({
    controllers: [DepartmentsController],
    providers: [DepartmentsService],
    imports: [
        TypeOrmModule.forFeature([
            Department
        ])
    ]
})
export class DepartmentsModule { }
