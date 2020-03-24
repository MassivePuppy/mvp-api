import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Domains } from 'src/constants/domains';
import { Role } from 'src/decorators/role.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@ApiTags(Domains.USERS)
@UseGuards(JwtAuthGuard)
@Controller(Domains.USERS)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @UseGuards(RoleGuard)
  @Role('admin')
  getAllUsers(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.getById(id)
  }

  @Post()
  @UseGuards(RoleGuard)
  @Role('admin')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<any> {
    return this.userService.updateById(id, updateUserDto)
  }

  @UseGuards(RoleGuard)
  @Role('admin')
  @Delete(':id')
  remove(@Param('id') id: string): Promise<any> {
    return this.userService.deleteById(id)
  }

}
