import { Module } from '@nestjs/common';

import { HashService } from '@/shared/providers/hash/hash.service';
import { PrismaService } from '@/shared/providers/prisma/prisma.service';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [PrismaService, HashService, UsersService],
})
export class UsersModule {}
