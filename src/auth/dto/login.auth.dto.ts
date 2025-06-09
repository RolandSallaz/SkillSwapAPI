import { IsEmail, IsInt, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsInt()
  id: number;
}
