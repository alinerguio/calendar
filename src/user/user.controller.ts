import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    createUser(@Body() createUser: CreateUserDto){
        return this.userService.createUser(createUser);
    }
}
