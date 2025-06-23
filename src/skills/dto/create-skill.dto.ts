import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUUID()
  @IsNotEmpty()
  category: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];
}