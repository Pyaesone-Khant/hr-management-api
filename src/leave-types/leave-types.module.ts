import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveType } from './leave-type.entity';
import { LeaveTypesController } from './leave-types.controller';
import { LeaveTypesService } from './providers/leave-types.service';

@Module({
    controllers: [LeaveTypesController],
    providers: [LeaveTypesService],
    imports: [
        TypeOrmModule.forFeature([
            LeaveType
        ])
    ]
})
export class LeaveTypesModule { }
