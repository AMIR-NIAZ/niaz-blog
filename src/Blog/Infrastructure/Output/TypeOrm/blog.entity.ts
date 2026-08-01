import { UserEntity } from "src/User/Infrastructure/Output/TypeOrm/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CommentEntity } from "./comment.entity";

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

    @ManyToOne(() => UserEntity)
    @JoinColumn({
        name: "authorId"
    })
    author: UserEntity;

    @OneToMany(() => CommentEntity, (comment) => comment.blog)
    comments: CommentEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
