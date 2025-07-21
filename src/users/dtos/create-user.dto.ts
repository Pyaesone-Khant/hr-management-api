import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsDateString()
    dob: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsNumber()
    @IsNotEmpty()
    officeId: number;

    @IsNumber()
    @IsNotEmpty()
    departmentId: number;

    @IsNumber()
    @IsNotEmpty()
    positionId: number;
}