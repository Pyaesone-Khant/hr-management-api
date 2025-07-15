import { SetMetadata } from "@nestjs/common";
import { RoleEnum } from "src/roles/enums/role.enum";
import { ROLES_KEY } from "../constants/auth.constants";

export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);