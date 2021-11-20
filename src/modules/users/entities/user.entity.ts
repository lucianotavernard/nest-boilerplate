import { Prisma } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  id: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  name: string;
  email: string;
  password: string;
  tokens?: Prisma.UserTokenUncheckedCreateNestedManyWithoutUserInput;
}
