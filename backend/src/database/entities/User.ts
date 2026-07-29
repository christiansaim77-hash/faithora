import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Post } from './Post';
import { PrayerRequest } from './PrayerRequest';
import { Group } from './Group';
import { Message } from './Message';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  // hashed password
  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  displayName?: string;

  @OneToMany(() => Post, (post) => post.author)
  posts!: Post[];

  @OneToMany(() => PrayerRequest, (pr) => pr.requester)
  prayerRequests!: PrayerRequest[];

  @ManyToMany(() => Group, (group) => group.members)
  @JoinTable({
    name: 'group_members',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'group_id', referencedColumnName: 'id' },
  })
  groups!: Group[];

  @OneToMany(() => Message, (message) => message.sender)
  messages!: Message[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
