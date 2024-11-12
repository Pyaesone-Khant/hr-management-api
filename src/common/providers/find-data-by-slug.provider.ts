import { Injectable } from '@nestjs/common';
import { handleException } from 'src/helpers/exception-handler.helper';
import { ObjectLiteral, Repository } from 'typeorm';

interface GenericTypeEntity extends ObjectLiteral {
    "slug": string
}

@Injectable()
export class FindDataBySlugProvider {

    async findDataBySlug<T extends GenericTypeEntity>(
        repository: Repository<T>,
        slug: string): Promise<T | undefined> {
        let data: T | undefined;

        try {
            data = await repository.findOne({
                where: { slug: slug as any }
            })
        } catch (error) {
            handleException(408)
        }
        return data;
    }

}
