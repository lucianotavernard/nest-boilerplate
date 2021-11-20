import { Controller, Get, Post, Body, Patch, Request } from '@nestjs/common';

import { Public } from '@/modules/auth/auth.decorator';
import { AuthRequest } from '@/modules/auth/dto/auth-request.dto';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/profile')
  show(@Request() request: AuthRequest) {
    return this.usersService.findById(request.user.id);
  }

  @Patch('/profile')
  update(
    @Request() request: AuthRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(request.user.id, updateUserDto);
  }
}
