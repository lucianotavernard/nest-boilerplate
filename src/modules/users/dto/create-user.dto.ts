import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../entities/user.entity';

type UserWithoutId = Omit<User, 'id'>;

export class CreateUserDto implements UserWithoutId {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(40)
  password: string;
}
