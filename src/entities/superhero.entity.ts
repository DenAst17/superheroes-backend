import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'superheroes' })
export class Superhero extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  real_name: string;

  @Column()
  origin_description: string;

  @Column()
  superpowers: string;

  @Column()
  catch_phrase: string;

  @Column("text", {array: true})
  images: string[];
}
