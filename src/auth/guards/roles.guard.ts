import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/roles/role.entity";
import { REQUEST_USER_KEY, ROLES_KEY } from "../constants/auth.constants";


@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ])

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request[REQUEST_USER_KEY];

        if (!user || !user.role) {
            console.log('User not found or role not assigned');
            throw new ForbiddenException('You do not have permission to access this resource!');
        }

        const hasRequiredRole = requiredRoles.includes(user.role);

        if (!hasRequiredRole) {
            console.log('User does not have the required role');
            throw new ForbiddenException('You do not have permission to access this resource!');
        }

        return true;
    }
}