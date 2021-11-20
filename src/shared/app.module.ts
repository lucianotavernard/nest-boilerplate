import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/providers/prisma/prisma.service';
import { HashService } from '@/shared/providers/hash/hash.service';
import { UsersModule } from '@/modules/users/users.module';

@Module({
  imports: [PrismaService, HashService, UsersModule],
})
export class AppModule {}
