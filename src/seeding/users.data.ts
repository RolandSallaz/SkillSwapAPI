import { Gender, UserRole } from "src/users/enums";
import { User } from "../users/entities/users.entity";

export const users: Array<User> = [ 
  {
    name: 'Александр',
    email: 'alex@example.com',
    password: 'hashed_pw_1',
    age: 30,
    city: 'Москва',
    aboutMe: 'Люблю IT и кофе',
    gender: Gender.MALE,
    skills: [],
    role: UserRole.USER,
  },
  {
    name: 'Мария',
    email: 'maria@example.com',
    password: 'hashed_pw_2',
    age: 25,
    city: 'Санкт-Петербург',
    aboutMe: 'Фронтенд разработчик',
    gender: Gender.FEMALE,
    skills: [],
    role: UserRole.USER,
  },
  {
    name: 'Иван',
    email: 'ivan@example.com',
    password: 'hashed_pw_3',
    age: 28,
    city: 'Новосибирск',
    aboutMe: 'Бэкенд-энтузиаст',
    gender: Gender.MALE,
    skills:[],
    role: UserRole.USER,
  }
]