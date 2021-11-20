import { Module } from '@nestjs/common';

import { HashService } from '@/shared/providers/hash/hash.service';
import { PrismaService } from '@/shared/providers/prisma/prisma.service';

import { UsersTokensService } from './users-tokens.service';
import { UsersTokensController } from './users-tokens.controller';

@Module({
  controllers: [UsersTokensController],
  providers: [PrismaService, HashService, UsersTokensService],
})
export class UsersTokensModule {}
