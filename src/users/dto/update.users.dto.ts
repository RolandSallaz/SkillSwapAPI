import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDto } from './create.users.dto';

export class UpdateUsersDto extends PartialType(CreateUsersDto) {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
