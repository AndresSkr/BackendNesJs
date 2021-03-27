import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interfaces'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  private hashLength = 16;
  constructor(@InjectModel('user') private readonly userModule: Model<User>) {

  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await this.getHash(createUserDto.password)
    const user = new this.userModule(createUserDto);
    return await user.save()
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModule.find();
    return users;
  }

  async findOne(user: string): Promise<User> {
    const userFind = await this.userModule.findOne({ user })
    return userFind;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userUpdate = await this.userModule.findByIdAndUpdate(id,
      updateUserDto, { new: true });
    return userUpdate;
  }

  async remove(id: string): Promise<User> {
    const userDelete = await this.userModule.findByIdAndDelete(id)
    return userDelete;
  }

  async getHash(password: string): Promise<string> {
    return bcrypt.hash(password, this.hashLength);
  }
  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
