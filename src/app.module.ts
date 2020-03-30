import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import configuration from './config/configuration';
import { MongoUtil } from './utils/mongo';
import { AuthModule } from './auth/auth.module';
import { TrainingPlanModule } from './trainingplan/trainingplan.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    MongooseModule.forRoot(MongoUtil.toConnectionString(configuration().mongo),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    UserModule,
    AuthModule,
    TrainingPlanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
