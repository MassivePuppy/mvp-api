import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './schemas/user.schema';
import { ActivationTokenSchema } from './schemas/activationToken.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'ActivationToken', schema: ActivationTokenSchema}
  ])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}