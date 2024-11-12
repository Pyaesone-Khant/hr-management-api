import { IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class CreatePositionDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: "A slug should be all lowercase, and words should be separated by hyphens(-)."
    })
    slug: string;

    @IsString()
    @IsOptional()
    description?: string;
}