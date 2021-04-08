import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
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
}
