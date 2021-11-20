import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/providers/prisma/prisma.service';
import { HashService } from '@/shared/providers/hash/hash.service';

@Module({
  imports: [PrismaService, HashService],
})
export class AppModule {}
