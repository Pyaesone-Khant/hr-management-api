import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOfficeDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    longitude: number;

    @IsNotEmpty()
    @IsNumber()
    latitude: number;

    @IsString()
    @IsOptional()
    address?: string;
}