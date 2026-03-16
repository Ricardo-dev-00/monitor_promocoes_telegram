import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../auth/user.entity';

@Entity('alerts')
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  keyword: string;

  @Column()
  group_name: string;

  @Column({ type: 'text' })
  message_text: string;

  @Column()
  telegram_message_id: string;

  @Column()
  product_name: string;

  @Column({ type: 'decimal', nullable: true })
  price: number;

  @Column()
  store: string;

  @Column({ type: 'text', nullable: true })
  promotion_link: string;

  @CreateDateColumn()
  created_at: Date;
}
