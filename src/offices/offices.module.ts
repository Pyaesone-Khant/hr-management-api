import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Office } from './office.entity';
import { OfficesController } from './offices.controller';
import { OfficesService } from './offices.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Office
        ])
    ],
    providers: [
        OfficesService
    ],
    controllers: [
        OfficesController
    ],
    exports: [
        OfficesService
    ]
})
export class OfficesModule { }
