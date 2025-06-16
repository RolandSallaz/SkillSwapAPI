import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDto } from './create.users.dto';

export class UpdateUsersDto extends PartialType(CreateUsersDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
