import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeOrmCommentEntity } from './TypeOrmComment.entity';
import { TypeOrmUserEntity } from 'src/User/Infrastructure/Output/Persistence/TypeOrm/TypeOrmUser.entity';

@Entity('blogs')
export class TypeOrmBlogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  ViewCount: number;

  @ManyToOne(() => TypeOrmUserEntity)
  @JoinColumn({
    name: 'authorId',
  })
  author: TypeOrmUserEntity;

  @OneToMany(() => TypeOrmCommentEntity, (comment) => comment.blog)
  comments: TypeOrmCommentEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
