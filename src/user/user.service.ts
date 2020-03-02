import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashUtil } from 'src/utils/hash';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {

    if (!(createUserDto.password === createUserDto.passwordConfirmation)) {
      throw new Error("Password do not match, sorry.")
    }

    createUserDto.password = await HashUtil.hash(createUserDto.password)
    delete createUserDto.passwordConfirmation

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
