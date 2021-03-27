import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schemas/user.schema';
import { AuthModule } from '../../auth/auth.module'; 


@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [MongooseModule.forFeature([
    { name: 'user', schema: userSchema }
  ])],
  exports:[UserService]
})
export class UserModule { }
