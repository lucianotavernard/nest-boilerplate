import { AuthService } from '@/modules/auth/auth.service';
import { Controller, Post, Body } from '@nestjs/common';

import { Public } from './auth.decorator';
import { CreateSessionDto } from './dto/create-session.dto';

@Controller('sessions')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Public()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.authService.create(createSessionDto);
  }
}
