import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { AuthTypes } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthType } from 'src/auth/enum/auth-types.enum';
import { RoleEnum } from 'src/roles/enums/role.enum';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Get()
    @AuthTypes(AuthType.None)
    findAll(
        @Query('status') status: string
    ) {
        return this.usersService.findAll(status);
    }

    @Post()
    @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN)
    createUser(
        @Body() createUserDto: CreateUserDto
    ) {
        return this.usersService.createUser(createUserDto);
    }

    @Delete(':id')
    @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN)
    remove(
        @Param('id') id: string
    ) {
        return this.usersService.remove(+id);
    }
}
