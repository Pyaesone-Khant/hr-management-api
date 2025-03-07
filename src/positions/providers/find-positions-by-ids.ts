import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { handleException } from 'src/helpers/exception-handler.helper';
import { In, Repository } from 'typeorm';
import { Position } from '../position.entity';

@Injectable()
export class FindPositionsByIds {
    constructor(
        @InjectRepository(Position)
        private readonly positionRepository: Repository<Position>
    ) { }

    async findPositions(ids: number[]) {
        let positions: Position[] | [];

        try {
            positions = await this.positionRepository.findBy({
                id: In(ids)
            })
        } catch (error) {
            handleException(408, error)
        }
        return positions;
    }
}
