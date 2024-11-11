import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min, MinLength } from "class-validator";

export class CreateLeaveTypeDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    @Max(365)
    days: number

    @IsString()
    @IsOptional()
    @MinLength(5)
    description?: string;
}