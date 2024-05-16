import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) {}

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    return user;
  }

  // async findByEmail(email: string): Promise<User | null> {
  //   return await this.userModel.findOne({ email }).exec();
  // }

  // async findOneByEmailAndPassword(email: string, password: string): Promise<User> {
  //   const user = await this.userModel.findOne({ email }).exec();
  //   if (!user) {
  //     throw new NotFoundException(`User with email ${email} not found`);
  //   }
  
    // ตรวจสอบว่ารหัสผ่านที่ใส่เข้ามาตรงกับที่มีอยู่ในฐานข้อมูลหรือไม่
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   throw new Error('Invalid email or password');
    // }
  
    // คืนค่าทั้ง user และ password
  //   return { id: user.id, email: user.email, password: user.password };
  // }
  

  
  async create(createUserInput: CreateUserInput): Promise<User> {
    const { email, password } = createUserInput;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const createdUser = new this.userModel({ email, password });
    return await createdUser.save();
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userModel.findById(email).exec();
    if (!user || !user.email || !user.password) {
      throw new NotFoundException(`User with ID ${email} not found`);
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



