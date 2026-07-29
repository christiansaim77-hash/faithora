import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Group } from './Group';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  content!: string;

  // Who sent the message
  @ManyToOne(() => User, (user) => user.messages, { onDelete: 'SET NULL', nullable: true })
  sender!: User | null;

  // Optional: message in a group
  @ManyToOne(() => Group, (group) => group.messages, { onDelete: 'CASCADE', nullable: true })
  group?: Group | null;

  // Optional direct message recipient
  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  recipient?: User | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
