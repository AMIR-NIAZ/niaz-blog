import { UserEntity } from "src/User/Infrastructure/Output/TypeOrm/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BlogEntity } from "./blog.entity";

@Entity('comments')
export class CommentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    text: string;

    @ManyToOne(() => UserEntity)
    sender: UserEntity;

    @ManyToOne(() => BlogEntity)
    blog: BlogEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}