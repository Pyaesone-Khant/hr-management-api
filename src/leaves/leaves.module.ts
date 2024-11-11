import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leave } from './leave.entity';
import { LeavesController } from './leaves.controller';
import { LeavesService } from './providers/leaves.service';

@Module({
    controllers: [LeavesController],
    providers: [LeavesService],
    imports: [
        TypeOrmModule.forFeature([
            Leave
        ])
    ]
})
export class LeavesModule { }
