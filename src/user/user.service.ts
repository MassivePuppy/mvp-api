import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getById(_id: string): Promise<User> {
    return this.userModel.find({ _id }).exec();
  }

  async updateById(_id: string, updateUserDto: UpdateUserDto): Promise<any> {
    return this.userModel.updateOne({ _id }, updateUserDto).exec()
  }

  async deleteById(_id: string): Promise<any> {
    return this.userModel.deleteOne({ _id }).exec()
  }
}
