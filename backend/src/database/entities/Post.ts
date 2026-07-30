import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { User } from './User';

export enum PostType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  SCRIPTURE = 'SCRIPTURE',
  PRAYER = 'PRAYER',
  TESTIMONY = 'TESTIMONY',
}

export enum Visibility {
  PUBLIC = 'PUBLIC',
  FOLLOWERS = 'FOLLOWERS',
  PRIVATE = 'PRIVATE',
}

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE', nullable: false })
  @Index()
  author!: User;

  @Column({ type: 'text', nullable: true })
  content!: string;

  @Column({ type: 'varchar', length: 32, default: PostType.TEXT })
  type!: PostType;

  @Column({ type: 'varchar', length: 500, nullable: true })
  mediaUrl?: string | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  languageCode?: string | null;

  @Column({ type: 'varchar', length: 20, default: Visibility.PUBLIC })
  visibility!: Visibility;

  @Column({ type: 'int', default: 0 })
  likesCount!: number;

  @Column({ type: 'int', default: 0 })
  commentsCount!: number;

  @Column({ default: false })
  published!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
