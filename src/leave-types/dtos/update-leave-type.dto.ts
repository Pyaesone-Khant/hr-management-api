import { PartialType } from "@nestjs/mapped-types";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateLeaveTypeDto } from "./create-leave-type.dto";

export class UpdateLeaveTypeDto extends PartialType(CreateLeaveTypeDto) {
    @IsInt()
    @IsNotEmpty()
    id: number;
}