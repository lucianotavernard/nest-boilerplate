import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { HashService } from '@/shared/providers/hash/hash.service';
import { UsersService } from '@/modules/users/users.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashProvider: HashService,
    private readonly jwtProvider: JwtService,
  ) {}

  async create(createSessionDto: CreateSessionDto) {
    const user = await this.validateUser(createSessionDto);

    const payload = {
      username: user.email,
      sub: user.id,
    };

    const token = this.jwtProvider.sign(payload);

    return {
      token,
    };
  }

  private async validateUser({ email, password }: CreateSessionDto) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const passwordMatched = await this.hashProvider.compare(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new HttpException(
        'E-mail or password incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }
}
