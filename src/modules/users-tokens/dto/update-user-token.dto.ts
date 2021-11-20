import { IsString } from 'class-validator';

export class UpdateUserTokenDto {
  @IsString()
  password: string;
}
