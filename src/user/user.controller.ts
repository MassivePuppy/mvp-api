import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessControlGuard } from 'src/auth/guards/access-control.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Domains } from 'src/constants/domains';
import { UseRoles } from 'src/decorators/use-roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@ApiTags(Domains.USERS)
@Controller(Domains.USERS)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @UseGuards(JwtAuthGuard, AccessControlGuard)
  @UseRoles({
    resource: Domains.USERS,
    action: 'read',
    possession: 'any',
  })
  getAllUsers(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, AccessControlGuard)
  @UseRoles({
    resource: Domains.USERS,
    action: 'read',
    possession: 'own',
  })
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.getById(id)
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AccessControlGuard)
  @UseRoles({
    resource: Domains.USERS,
    action: 'update',
    possession: 'own',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<any> {
    return this.userService.updateById(id, updateUserDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AccessControlGuard)
  @UseRoles({
    resource: Domains.USERS,
    action: 'delete',
    possession: 'own',
  })
  remove(@Param('id') id: string): Promise<any> {
    return this.userService.deleteById(id)
  }

  @Get('activate/:token')
  activateUser(@Param('token') token: string): Promise<User> {
    return this.userService.activateUser(token)
  }

}
