import { SetMetadata } from "@nestjs/common";
import { AUTH_TYPE_KEY } from "../constants/auth.constants";
import { AuthType } from "../enum/auth-types.enum";

export const AuthTypes = (...authTypes: AuthType[]) => SetMetadata(AUTH_TYPE_KEY, authTypes); 