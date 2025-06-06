import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Min,
  Max,
} from 'class-validator';

export enum Gender {
  MALE = 'М',
  FEMALE = 'Ж',
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
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

  //отдельный DTO для навыков
  @IsString()
  skills: string;

  //отдельный DTO для категорий
  @IsString()
  wantToLearn: string;

  @IsString()
  favoriteSkills: string;

  @IsEnum(UserRole)
  role: UserRole;
}
