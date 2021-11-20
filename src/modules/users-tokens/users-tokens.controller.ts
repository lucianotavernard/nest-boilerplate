import { Controller, Post, Body, Patch, Param } from '@nestjs/common';

import { Public } from '@/modules/auth/auth.decorator';
import { UsersTokensService } from './users-tokens.service';

import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { UpdateUserTokenDto } from './dto/update-user-token.dto';

@Controller('passwords')
export class UsersTokensController {
  constructor(private readonly usersTokensService: UsersTokensService) {}

  @Post('/forgot')
  @Public()
  create(@Body() createUsersTokenDto: CreateUserTokenDto) {
    return this.usersTokensService.create(createUsersTokenDto);
  }

  @Patch('/reset/:id')
  @Public()
  update(
    @Param('id') id: string,
    @Body() updateUsersTokenDto: UpdateUserTokenDto,
  ) {
    return this.usersTokensService.update(id, updateUsersTokenDto);
  }
}
