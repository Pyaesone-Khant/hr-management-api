import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './position.entity';
import { PositionsController } from './positions.controller';
import { PositionsService } from './providers/positions.service';

@Module({
    controllers: [PositionsController],
    providers: [PositionsService],
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
