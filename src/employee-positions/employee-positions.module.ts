import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeePositionsController } from './employee-positions.controller';
import { EmployeePosition } from './employee-postition.entity';
import { EmployeePositionsService } from './providers/employee-positions.service';

@Module({
    controllers: [EmployeePositionsController],
    providers: [EmployeePositionsService],
    imports: [
        TypeOrmModule.forFeature([
            EmployeePosition
        ])
    ]
})
export class EmployeePositionsModule { }
