import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionsController } from './positions.controller';
import { Position } from './posititon.entity';
import { PositionsService } from './providers/positions.service';

@Module({
    controllers: [PositionsController],
    providers: [PositionsService],
    imports: [
        TypeOrmModule.forFeature([
            Position
        ])
    ]
})
export class PositionsModule { }
