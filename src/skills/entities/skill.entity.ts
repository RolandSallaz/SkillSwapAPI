import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('uuid')
  category: string; //связь с категорией

  @Column('text', { array: true })
  images: string[];

  @Column()
  owner: string; //связь с пользователем
}
