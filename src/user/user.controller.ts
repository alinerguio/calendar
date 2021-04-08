import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    createUser(@Body() createUser: CreateUserDto){
        return this.userService.createUser(createUser);
    }

    @Put(':id')
    updateUser(@Body() updateUser: UpdateUserDto, @Param("id") id: number){
        return this.userService.updateUser(+id, updateUser);
    }

    @Get()
    findUsers(@Query() findUsers: FindUsersDto){
        return this.userService.findUsers(findUsers);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string): void {
        this.userService.deleteUser(id);
    }
}
