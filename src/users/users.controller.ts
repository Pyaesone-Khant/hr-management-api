import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Post()
    createUser(
        @Body() createUserDto: CreateUserDto
    ) {
        // Logic to create a user will go here
        return this.usersService.createUser(createUserDto);
    }

}
