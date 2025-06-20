import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { User } from '../entities/users.entity';
import { Gender } from '../enums';
import { ApiProperty } from '@nestjs/swagger';

// DTO для создания пользователя при передачи данных через API
export class CreateUsersDto extends PartialType(User) {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор пользователя',
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @Min(10)
  @Max(100)
  age: number;

  @IsString()
  city: string;

  @IsString()
  aboutMe: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  refreshToken: string;
}
