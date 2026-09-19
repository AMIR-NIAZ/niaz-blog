import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeOrmBlogEntity } from './TypeOrmBlog.entity';
import { TypeOrmUserEntity } from 'src/User/Infrastructure/Output/Persistence/TypeOrm/TypeOrmUser.entity';

@Entity('comments')
export class TypeOrmCommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => TypeOrmUserEntity)
  sender: TypeOrmUserEntity;

  @ManyToOne(() => TypeOrmBlogEntity)
  blog: TypeOrmBlogEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
