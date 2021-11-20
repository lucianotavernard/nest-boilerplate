import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/providers/prisma/prisma.service';

@Module({
  imports: [PrismaService],
  controllers: [],
  providers: [],
})
export class AppModule {}
