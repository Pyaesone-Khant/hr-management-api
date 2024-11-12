import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EmploymentStatus } from "../enums/employment-status.enum";

export class CreateEmployeeDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    nrc: string;

    @IsString()
    @IsNotEmpty()
    mobileNumber: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsDate()
    @IsNotEmpty()
    dob: Date;

    @IsString()
    @IsEnum(EmploymentStatus)
    @IsNotEmpty()
    employmentStatus: EmploymentStatus;

    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @IsDate()
    @IsOptional()
    endDate?: Date;

    @IsInt()
    @IsNotEmpty()
    departmentId: number;
}