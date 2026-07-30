import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Message } from './Message';
import { ConversationParticipant } from './ConversationParticipant';

export enum ConversationType {
  PRIVATE = 'PRIVATE',
  GROUP = 'GROUP',
}

@Entity({ name: 'conversations' })
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 16, default: ConversationType.PRIVATE })
  @Index()
  type!: ConversationType;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string | null;

  @OneToMany(() => ConversationParticipant, (p) => p.conversation)
  participants!: ConversationParticipant[];

  @OneToMany(() => Message, (m) => m.conversation)
  messages!: Message[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
