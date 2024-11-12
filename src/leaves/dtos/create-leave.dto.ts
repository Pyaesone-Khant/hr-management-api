import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateLeaveDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    reason: string;

    @IsString()
    @IsOptional()
    @MinLength(5)
    description?: string;

    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @IsDate()
    @IsNotEmpty()
    endDate: Date;

    @IsInt()
    @IsNotEmpty()
    leaveTypeId: number;

    @IsInt()
    @IsNotEmpty()
    employeeId: number;
}