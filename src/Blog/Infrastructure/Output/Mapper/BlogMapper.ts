import Blog from "src/Blog/Domain/Blog";
import { TypeOrmBlogEntity } from "../TypeOrm/blog.entity";
import BlogId from "src/Blog/Domain/ValueObjects/BlogId";
import Title from "src/Blog/Domain/ValueObjects/Title";
import Content from "src/Blog/Domain/ValueObjects/Content";
import UserId from "src/Blog/Domain/ValueObjects/UserId";
import Comment from "src/Blog/Domain/Comment";
import CommentText from "src/Blog/Domain/ValueObjects/CommentText";
import CommentId from "src/Blog/Domain/ValueObjects/CommentId";
import { CommentEntity } from "../TypeOrm/comment.entity";
import ViewCount from "src/Blog/Domain/ValueObjects/ViewCount";
import BlogResponse from "src/Blog/Application/Ports/Responses/BlogResponse";
import { CommentResponse } from "src/Blog/Application/Ports/Responses/CommentResponse";

export default class BlogMapper {
    static toDomain(model: TypeOrmBlogEntity): Blog {
        const comments: Comment[] = []
        for (const commentModel of model.comments ?? []) {
            const comment = new Comment(
                CommentId.fromValid(commentModel.id),
                CommentText.fromValid(commentModel.text),
                UserId.fromValid(commentModel.sender.id),
                commentModel.createdAt,
                commentModel.updatedAt
            )
            comments.push(comment);
        }

        const blog: Blog = new Blog(
            BlogId.fromValid(model.id),
            Title.fromValid(model.title),
            Content.fromValid(model.content),
            UserId.fromValid(model.author.id),
            ViewCount.fromValid(model.ViewCount),
            comments,
            model.createdAt,
            model.updatedAt,
        );

        return blog;
    }

    static toPersistence(blog: Blog): TypeOrmBlogEntity {
        const entity = new TypeOrmBlogEntity();

        entity.id = blog.id.getValue;
        entity.title = blog.title.getValue;
        entity.content = blog.content.getValue;
        entity.author = {
            id: blog.userId.getValue
        } as any
        entity.ViewCount = blog.viewCount.getValue;

        entity.createdAt = blog.createdAt;
        entity.updatedAt = blog.updatedAt;

        entity.comments = blog.comments.map(comment => {
            const commentEntity = new CommentEntity();

            commentEntity.id = comment.id.getValue;
            commentEntity.text = comment.text.getValue;
            commentEntity.sender.id = comment.userId.getValue;
            commentEntity.blog.id = blog.id.getValue;

            commentEntity.createdAt = comment.createdAt;
            commentEntity.updatedAt = comment.updatedAt;

            return commentEntity;
        });

        return entity;
    }

    static toResponse(blog: Blog): BlogResponse {
        return new BlogResponse(
            blog.id.getValue,
            blog.title.getValue,
            blog.content.getValue,
            blog.userId.getValue,
            blog.viewCount.getValue,
            blog.createdAt,
            blog.updatedAt,
            blog.comments?.map(comment =>
                new CommentResponse(
                    comment.id.getValue,
                    comment.text.getValue,
                    comment.userId.getValue,
                    comment.createdAt,
                    comment.updatedAt,
                ),
            )
        );
    }
}
