import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';

import { PrismaService } from '@/shared/providers/prisma/prisma.service';
import { HashService } from '@/shared/providers/hash/hash.service';

import { AuthService } from '@/modules/auth/auth.service';
import { UsersModule } from '@/modules/users/users.module';
import { AuthController } from '@/modules/auth/auth.controller';
import { JwtStrategy } from '@/modules/auth/strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [PrismaService, HashService, AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
