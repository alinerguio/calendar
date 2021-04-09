import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FindTasksDto } from './dto/find-tasks.dto';
import { TaskService } from './task.service';

@Controller('users/:id/tasks')
export class TaskController {
    constructor(private taskService: TaskService){}

    @Post()
    createUser(@Body() createTask: CreateTaskDto){
        return this.taskService.createTask(createTask);
    }

    @Get()
    findTasks(@Query() findTasks: FindTasksDto){
        return this.taskService.findTasks(findTasks);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string): void {
        this.taskService.deleteUser(id);
    }
}
