import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, NotFoundException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService) { }

  @Post()
  async create(@Res() res, @Body() createUserDto: CreateUserDto) {
    const userCreate = await this.userService.create(createUserDto);
    return res.status(HttpStatus.OK).json(userCreate)
  }
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Res() res) {
    const users = await this.userService.findAll();
    return res.status(HttpStatus.OK).json(users)
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json(user)
  }

  @Patch(':id')
  async update(@Res() res, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {

    const userMody = await this.userService.update(id, updateUserDto);

    if (!userMody) throw new NotFoundException('User does not exist')
    return res.status(HttpStatus.OK).json({
      message: "Update Successfully",
      userMody
    })
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: string) {

    const deleteUser = await this.userService.remove(id);
    if (!deleteUser) throw new NotFoundException('User does not exist!')
    return res.status(HttpStatus.OK).json({
      message: 'Product Deleted Successfully',
      deleteUser
    })
  }
}
