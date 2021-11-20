import { Prisma } from '@prisma/client';

export class UserToken implements Prisma.UserTokenUncheckedCreateInput {
  id: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  userId: string;
  refreshToken: string;
  expiresIn: string | Date;
}
