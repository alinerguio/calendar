import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';

@Controller('users/:id_user/tasks')
export class TaskController {
    constructor(private taskService: TaskService){}

    @Post()
    createUser(@Param('id_user') id_user: string, @Body() createTaskDto: CreateTaskDto){
        createTaskDto.userId = +id_user;
        return this.taskService.createTask(createTaskDto);
    }

    @Get()
    findTasks(@Param('id_user', ParseIntPipe) userId: number){
        return this.taskService.findTasks(userId);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string): void {
        this.taskService.deleteUser(id);
    }
}
