import Blog from "src/Blog/Domain/Blog";
import { BlogEntity } from "../TypeOrm/blog.entity";
import BlogId from "src/Blog/Domain/ValueObjects/BligId";
import Title from "src/Blog/Domain/ValueObjects/Title";
import Content from "src/Blog/Domain/ValueObjects/Content";
import UserId from "src/Blog/Domain/ValueObjects/UserId";
import Comment from "src/Blog/Domain/Comment";
import CommentText from "src/Blog/Domain/ValueObjects/CommentText";
import CommentId from "src/Blog/Domain/ValueObjects/CommentId";
import { CommentEntity } from "../TypeOrm/comment.entity";

export default class BlogMapper {
    static toDomain(model: BlogEntity): Blog {
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
            comments,
            model.createdAt,
            model.updatedAt,
        );

        return blog;
    }

    static toPersistence(blog: Blog): BlogEntity {
        const entity = new BlogEntity();

        entity.id = blog.id.getValue;
        entity.title = blog.title.getValue;
        entity.content = blog.content.getValue;
        entity.author.id = blog.userId.getValue;

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
}
