import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfficeDto } from './dtos/create-office.dto';
import { Office } from './office.entity';

@Injectable()
export class OfficesService {

    constructor(
        @InjectRepository(Office)
        private readonly officeRepository: Repository<Office>
    ) { }

    async findAll(): Promise<Office[]> {

        let offices: Office[] = [];

        try {
            offices = await this.officeRepository.find();
        } catch (error) {
            throw new RequestTimeoutException('Failed to fetch offices');
        }

        return offices;
    }

    async findOne(id: number): Promise<Office> {
        let office: Office;

        try {
            office = await this.officeRepository.findOneBy({ id });
        } catch (error) {
            throw new RequestTimeoutException('Failed to fetch office');
        }

        if (!office) {
            throw new NotFoundException(`Office with ID ${id} not found`);
        }

        return office;
    }

    async create(createOfficeDto: CreateOfficeDto): Promise<Office> {
        let office: Office;

        try {
            office = this.officeRepository.create(createOfficeDto);
            await this.officeRepository.save(office);
        } catch (error) {
            throw new RequestTimeoutException('Failed to create office!');
        }

        return office;
    }

    async update(id: number, updateOfficeDto: CreateOfficeDto): Promise<Office> {
        let office: Office;

        try {
            office = await this.officeRepository.findOneBy({ id });
            this.officeRepository.merge(office, updateOfficeDto);
            await this.officeRepository.save(office);
        } catch (error) {
            throw new RequestTimeoutException('Failed to update office!');
        }

        return office;
    }

    async remove(id: number): Promise<void> {
        try {
            const office = await this.officeRepository.findOneBy({ id });
            if (!office) {
                throw new NotFoundException(`Office with ID ${id} not found`);
            }
            await this.officeRepository.remove(office);
        } catch (error) {
            throw new RequestTimeoutException('Failed to delete office!');
        }
    }

}
