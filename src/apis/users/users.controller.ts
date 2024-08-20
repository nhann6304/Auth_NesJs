import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/guards/passport/local-auth.guard';

@Controller('users')
@ApiTags('User-Api')

export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: "Update User" })
  @Patch()
  @Public()
  update(@Body() updateUserDto: UpdateUserDto) {
    const userUpdate = this.usersService.update(updateUserDto)
    return userUpdate
  }
  @ApiOperation({ summary: "Xóa User" })
  @Public()
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.usersService.remove(id)
  }
}
