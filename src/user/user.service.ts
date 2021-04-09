import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ){}

    async createUser(createUser: CreateUserDto) {
        const user = await this.userModel.findOne({ 
            where: { email: createUser.email },
        }); // SELECT * FROM User WHERE email = :email

        if (user) {
            throw new ConflictException('Email já cadastrado');
        }

        return this.userModel.create(createUser);
    }

    updateUser(id: number, updateUser: UpdateUserDto) {
        return this.userModel.update(updateUser, { where : {id: id}});
    }

    findUsers(findUsers: FindUsersDto): Promise<User[]> {
        const where: any = {}

        if (findUsers.name) {
            where.name = findUsers.name;
        }
        
        if (findUsers.email) {
            where.email = findUsers.email;
        }

        return this.userModel.findAll({ where });
    }

    deleteUser(id: string) {
        return this.userModel.destroy({ where: { id } });
    }
}
