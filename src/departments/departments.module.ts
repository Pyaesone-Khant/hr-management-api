import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionsModule } from 'src/positions/positions.module';
import { Department } from './department.entity';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './providers/departments.service';

@Module({
    controllers: [DepartmentsController],
    providers: [
        DepartmentsService,
    ],
    imports: [
        TypeOrmModule.forFeature([
            Department
        ]),
        PositionsModule
    ],
    exports: [
        DepartmentsService
    ]
})
export class DepartmentsModule { }
