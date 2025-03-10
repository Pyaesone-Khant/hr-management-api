import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindDataBySlugProvider } from 'src/common/providers/find-data-by-slug.provider';
import { handleException } from 'src/helpers/exception-handler.helper';
import { Repository } from 'typeorm';
import { CreatePositionDto } from '../dtos/create-position.dto';
import { Position } from '../position.entity';
import { FindPositionsByIds } from './find-positions-by-ids';

@Injectable()
export class PositionsService {

    constructor(
        @InjectRepository(Position)
        private readonly positionRepository: Repository<Position>,

        private readonly findDataBySlugProvider: FindDataBySlugProvider,

        private readonly findPositionsByIds: FindPositionsByIds,
    ) { }

    async findAll(): Promise<Position[]> {

        let positions: Position[] | [];

        try {
            positions = await this.positionRepository.find();
        } catch (error) {
            handleException(408, error)
        }

        return positions;
    }

    async create(createPositionDto: CreatePositionDto): Promise<Position> {

        let position: Position | undefined;
        let newPostion: Position | undefined;

        try {
            position = await this.findDataBySlugProvider.findDataBySlug(this.positionRepository, createPositionDto.slug);

            if (position) {
                handleException(409)
            }
        } catch (error) {
            handleException(408, error)
        }

        try {
            newPostion = this.positionRepository.create(createPositionDto);
            await this.positionRepository.save(newPostion);
        } catch (error) {
            handleException(408, error)
        }

        return newPostion;
    }

    async findOne(id: number): Promise<Position> {

        let position: Position | undefined;

        try {
            position = await this.positionRepository.findOne({
                where: { id }
            });
        } catch (error) {
            handleException(408, error)
        }

        if (!position) {
            handleException(404, 'Position not found')
        }

        return position;
    }

    async update(id: number, updatePositionDto: CreatePositionDto): Promise<Position> {

        let position: Position | undefined;
        let positionBySlug: Position | undefined;

        position = await this.findOne(id);
        positionBySlug = await this.findDataBySlugProvider.findDataBySlug(this.positionRepository, updatePositionDto.slug);

        if (positionBySlug && positionBySlug.id !== position.id) {
            handleException(409)
        }

        position.name = updatePositionDto.name ?? position.name;
        position.slug = updatePositionDto.slug ?? position.slug;
        position.description = updatePositionDto.description ?? position.description;

        try {
            await this.positionRepository.save(position)
        } catch (error) {
            handleException(408, error)
        }

        return position;
    }

    async remove(id: number): Promise<object> {

        let position: Position | undefined;

        try {
            position = await this.findOne(id);
            await this.positionRepository.remove(position);
        } catch (error) {
            handleException(408, error)
        }

        return {
            message: 'Position removed successfully'
        };
    }

    async findPositions(ids: number[]): Promise<Position[]> {
        return await this.findPositionsByIds.findPositions(ids);
    }
}
