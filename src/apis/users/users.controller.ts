import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('User-Api')

export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    const userUpdate = this.usersService.update(updateUserDto)
    return userUpdate
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    console.log(id);
    return this.usersService.remove(id)
  }
}
