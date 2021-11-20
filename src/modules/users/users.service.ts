import { Prisma } from '@prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { HashService } from '@/shared/providers/hash/hash.service';
import { PrismaService } from '@/shared/providers/prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

type CreateUserInputData = Prisma.UserCreateInput;

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaProvider: PrismaService,
    private readonly hashProvider: HashService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const data: CreateUserInputData = {
      id: uuid(),
      ...createUserDto,
      password: await this.hashProvider.create(createUserDto.password),
    };

    const emailAlreadyExists = await this.findByEmail(createUserDto.email);

    if (emailAlreadyExists) {
      throw new HttpException('E-mail already exists', HttpStatus.BAD_REQUEST);
    }

    return this.prismaProvider.user.create({
      data,
    });
  }

  findById(id: string) {
    return this.prismaProvider.user.findUnique({
      where: {
        id,
      },
    });
  }

  findByEmail(email: string) {
    return this.prismaProvider.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { email, oldPassword, password, ...data } = updateUserDto;

    const user = await this.findById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    if (email) {
      const emailAlreadyExists = await this.findByEmail(email);

      if (emailAlreadyExists) {
        throw new HttpException(
          'E-mail already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (password && !oldPassword) {
      throw new HttpException(
        'Current password is Required',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compare(
        oldPassword,
        user.password,
      );

      if (!checkOldPassword) {
        throw new HttpException(
          'Current password does not match the stored password',
          HttpStatus.BAD_REQUEST,
        );
      }

      Object.assign(data, {
        password: await this.hashProvider.create(password),
      });
    }

    return this.prismaProvider.user.update({
      data,
      where: {
        id,
      },
    });
  }
}
