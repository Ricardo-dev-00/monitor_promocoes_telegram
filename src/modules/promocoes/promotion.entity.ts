import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('promotions')
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  group: string;

  @Column()
  keyword: string;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}
