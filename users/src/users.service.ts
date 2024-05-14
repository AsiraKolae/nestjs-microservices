import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { email, password } = createUserInput;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const createdUser = new this.userModel({ email, password });
    return await createdUser.save();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user || !user.email || !user.password) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    const validUsers = users.filter(user => user.email && user.password);
    return validUsers;
  }

  // async findById(authorId: string): Promise<User> {
  //   // ดึงข้อมูลผู้ใช้จากฐานข้อมูลโดยใช้ ID ที่ระบุ
  //   return await this.userModel.findById(authorId).exec();
  // }
}



