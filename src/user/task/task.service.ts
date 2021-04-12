import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task)
        private taskModel: typeof Task,
    ){}

    async createTask(createTask: CreateTaskDto) {
        const user = await User.findOne({ 
            where: { id: createTask.userId },
        }); // SELECT * FROM User WHERE id = task.userId

        if (!user) {
            throw new BadRequestException('Não foi possível criar a task, usuário não existente');
        }

        return this.taskModel.create(createTask);
    }

    async findTasks(userId: number): Promise<Task[]> {
        const user = await User.findOne({ 
            where: { id: userId },
        }); // SELECT * FROM User WHERE id = task.userId

        if (!user) {
            throw new BadRequestException('Não foi possível listar as tasks, usuário não existente.');
        }

        const where: any = {}
        where.userId = userId;
        return this.taskModel.findAll({ where });
    }

    deleteUser(id: string) {
        return this.taskModel.destroy({ where: { id } });
    }
}
