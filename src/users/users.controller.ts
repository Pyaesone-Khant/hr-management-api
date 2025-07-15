import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthTypes } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enum/auth-types.enum';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Get()
    @AuthTypes(AuthType.None)
    findAll() {
        return this.usersService.findAll();
    }

    @Post()
    createUser(
        @Body() createUserDto: CreateUserDto
    ) {
        // Logic to create a user will go here
        return this.usersService.createUser(createUserDto);
    }

}
