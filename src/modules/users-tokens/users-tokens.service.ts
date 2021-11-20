import { Prisma } from '@prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { HashService } from '@/shared/providers/hash/hash.service';
import { PrismaService } from '@/shared/providers/prisma/prisma.service';

import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { UpdateUserTokenDto } from './dto/update-user-token.dto';

type CreateUserTokenInputData = Prisma.UserTokenCreateInput;

@Injectable()
export class UsersTokensService {
  constructor(
    private readonly prismaProvider: PrismaService,
    private readonly hashProvider: HashService,
  ) {}

  async create(createUserTokenDto: CreateUserTokenDto) {
    const { userEmail } = createUserTokenDto;

    const userToken = await this.prismaProvider.userToken.findFirst({
      where: {
        expiresIn: {
          gt: new Date(),
        },
        user: {
          email: userEmail,
        },
      },
    });

    if (userToken) {
      return userToken;
    }

    const data: CreateUserTokenInputData = {
      id: uuid(),
      refreshToken: uuid(),
      expiresIn: new Date(2021, 12, 1),
      user: {
        connect: {
          email: userEmail,
        },
      },
    };

    await this.prismaProvider.userToken.create({
      data,
    });

    return 'Password recovery email was sent successfully';
  }

  async update(token: string, updateUserTokenDto: UpdateUserTokenDto) {
    const data = updateUserTokenDto;

    const userToken = await this.prismaProvider.userToken.findFirst({
      where: {
        expiresIn: {
          gt: new Date(),
        },
        refreshToken: token,
      },
    });

    if (!userToken) {
      throw new HttpException(
        'Recovery token not found',
        HttpStatus.BAD_REQUEST,
      );
    }

    Object.assign(data, {
      password: await this.hashProvider.create(data.password),
    });

    return 'Password reset successfully';
  }
}
