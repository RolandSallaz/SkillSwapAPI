import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDto } from './create.users.dto';

export class UpdateUsersDto extends PartialType(CreateUsersDto) {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
