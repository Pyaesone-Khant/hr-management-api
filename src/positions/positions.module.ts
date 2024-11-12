import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionsController } from './positions.controller';
import { Position } from './posititon.entity';
import { PositionsService } from './providers/positions.service';
import { FindPositionBySlugProvider } from './providers/find-position-by-slug.provider';

@Module({
    controllers: [PositionsController],
    providers: [PositionsService, FindPositionBySlugProvider],
    imports: [
        TypeOrmModule.forFeature([
            Position
        ])
    ]
})
export class PositionsModule { }
