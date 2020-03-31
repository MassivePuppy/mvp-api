import { Model } from 'mongoose';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TrainingPlan } from './interfaces/trainingplan.interface';
import { CreateTrainingPlanDto } from './dto/create-trainingplan.dto';
import { UpdateTrainingPlanDto } from './dto/update-trainingplan.dto';

@Injectable()
export class TrainingPlanService {
  constructor(
    @InjectModel('TrainingPlan') private readonly trainingPlanModel: Model<TrainingPlan>
  ) { }

  async createForUserId(createTrainingPlanDto: CreateTrainingPlanDto, userId: String): Promise<TrainingPlan> {
    return new this.trainingPlanModel({ userId, ...createTrainingPlanDto }).save()
  }

  async getAll(): Promise<TrainingPlan[]> {
    return this.trainingPlanModel.find().exec()
  }

  async getById(_id: string): Promise<TrainingPlan> {
    return this.trainingPlanModel.findOne({ _id }).exec()
  }

  async updateById(_id: string, updateTrainingPlanDto: UpdateTrainingPlanDto): Promise<any> {
    return this.trainingPlanModel.updateOne({ _id }, updateTrainingPlanDto).exec()
  }

  async deleteById(_id: string): Promise<any> {
    return this.trainingPlanModel.deleteOne({ _id }).exec()
  }
}
