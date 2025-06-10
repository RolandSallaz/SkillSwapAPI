import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Gender {
  MALE = 'М',
  FEMALE = 'Ж',
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

//Данные пользователя для базы
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column()
  city: string;

  //о себе
  @Column()
  aboutMe: string;

  @Column()
  gender: Gender;

  //отдельный entity для навыков
  @Column()
  skills: string;

  //отдельный entity для категорий
  @Column()
  wantToLearn: string;

  @Column()
  favoriteSkills: string;

  @Column({ default: 'USER' })
  role: UserRole;
}
