import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { handleException } from 'src/helpers/exception-handler.helper';
import { Repository } from 'typeorm';
import { Position } from '../posititon.entity';

@Injectable()
export class FindPositionBySlugProvider {

    constructor(
        @InjectRepository(Position)
        private readonly positionRepository: Repository<Position>,
    ) { }

    async findPositionBySlug(slug: string): Promise<Position> {
        let position: Position | undefined;

        try {
            position = await this.positionRepository.findOne({
                where: { slug }
            });
        } catch (error) {
            handleException(408, error)
        }

        return position;
    }

}
