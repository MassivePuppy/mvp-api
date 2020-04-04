import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingPlanController } from './trainingplan.controller';
import { TrainingPlanService } from './trainingplan.service';
import { TrainingPlanSchema } from './schemas/trainingplan.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: 'TrainingPlan', schema: TrainingPlanSchema }
    ]),
    UserModule
  ],
  controllers: [TrainingPlanController],
  providers: [TrainingPlanService],
  exports: [TrainingPlanService]
})
export class TrainingPlanModule {}