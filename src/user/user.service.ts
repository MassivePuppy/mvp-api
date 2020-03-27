import { Model } from 'mongoose';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashUtil } from 'src/utils/hash';
import { ActivationToken } from './interfaces/activationToken.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('ActivationToken') private readonly activationTokenModel: Model<ActivationToken>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {

    if (!(createUserDto.password === createUserDto.passwordConfirmation)) {
      throw new Error("Password do not match, sorry.")
    }

    createUserDto.password = await HashUtil.hash(createUserDto.password)
    delete createUserDto.passwordConfirmation

    const createdUser = await new this.userModel(createUserDto).save()

    await this.createActivationToken(createdUser._id)

    return createdUser
  }

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec()
  }

  async getById(_id: string): Promise<User> {
    return this.userModel.findOne({ _id }).exec()
  }

  async getByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec()
  }

  async updateById(_id: string, updateUserDto: UpdateUserDto): Promise<any> {
    return this.userModel.updateOne({ _id }, updateUserDto).exec()
  }

  async deleteById(_id: string): Promise<any> {
    return this.userModel.deleteOne({ _id }).exec()
  }

  async createActivationToken(_id: string): Promise<ActivationToken> {
    return new this.activationTokenModel({
      token: Math.random().toString(36),
      userId: _id
    }).save()
  }

  async activateUser(token: string): Promise<User> {
    const activationToken: ActivationToken = await this.activationTokenModel.findOne({ token }).exec()

    if (!activationToken) {
      throw new HttpException('Invalid token', 400)
    }

    const _id = activationToken.userId

    const userToActivate: User = await this.userModel.findOne({ _id }).exec()

    const updatedUser = await this.userModel.updateOne({ _id }, {
      isActive: true
    }).exec()

    await this.activationTokenModel.deleteOne({ token }).exec()

    return updatedUser
  }
}
