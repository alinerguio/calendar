import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task)
        private taskModel: typeof Task,
    ){}

    async createTask(createTask: CreateTaskDto) {
        return this.taskModel.create(createTask);
    }

    findTasks(userId: number): Promise<Task[]> {
        const where: any = {}
        where.userId = userId;
        return this.taskModel.findAll({ where });
    }

    deleteUser(id: string) {
        return this.taskModel.destroy({ where: { id } });
    }
}
