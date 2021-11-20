import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { User } from '@/modules/users/entities/user.entity';

type Auth = Pick<User, 'email' | 'password'>;

export class CreateSessionDto implements Auth {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(40)
  password: string;
}
