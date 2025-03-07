import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './position.entity';
import { PositionsController } from './positions.controller';
import { FindPositionsByIds } from './providers/find-positions-by-ids';
import { PositionsService } from './providers/positions.service';

@Module({
    controllers: [PositionsController],
    providers: [PositionsService, FindPositionsByIds],
    imports: [
        TypeOrmModule.forFeature([
            Position
        ])
    ],
    exports: [
        PositionsService
    ]
})
export class PositionsModule { }
