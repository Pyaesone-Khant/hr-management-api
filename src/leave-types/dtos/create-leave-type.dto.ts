import { IsInt, IsNotEmpty, IsOptional, IsString, Matches, Max, Min, MinLength } from "class-validator";

export class CreateLeaveTypeDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: "A slug should be all lowercase, and words should be separated by hyphens(-)."
    })
    slug: string;

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    @Max(365)
    totalDays: number

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    takeableConsecDaysLimit: number

    @IsString()
    @IsOptional()
    @MinLength(5)
    description?: string;
}