// src/Blog/Infrastructure/Output/Persistence/TypeOrm/Mapper/TypeOrmComment.mapper.ts
import Comment from 'src/Blog/Domain/Entities/Comment';
import CommentId from 'src/Blog/Domain/ValueObjects/CommentId';
import CommentText from 'src/Blog/Domain/ValueObjects/CommentText';
import UserId from 'src/Blog/Domain/ValueObjects/UserId';
import BlogId from 'src/Blog/Domain/ValueObjects/BlogId';
import { CommentResponse } from 'src/Blog/Application/Ports/Responses/Comment.response';
import { TypeOrmCommentEntity } from '../TypeOrmComment.entity';

export default class CommentMapper {
  static toDomain(model: TypeOrmCommentEntity): Comment {
    return new Comment(
      CommentId.fromValid(model.id),
      CommentText.fromValid(model.text),
      UserId.fromValid(model.sender.id),
      model.createdAt,
      model.updatedAt,
    );
  }

  static toPersistence(comment: Comment, blogId: BlogId): TypeOrmCommentEntity {
    const entity = new TypeOrmCommentEntity();

    entity.id = comment.id.getValue;
    entity.text = comment.text.getValue;
    entity.sender = {
      id: comment.userId.getValue,
    } as TypeOrmCommentEntity['sender'];
    entity.blog = { id: blogId.getValue } as TypeOrmCommentEntity['blog'];
    entity.createdAt = comment.createdAt;
    entity.updatedAt = comment.updatedAt;

    return entity;
  }

  static toResponse(comment: Comment): CommentResponse {
    return new CommentResponse(
      comment.id.getValue,
      comment.text.getValue,
      comment.userId.getValue,
      comment.createdAt,
      comment.updatedAt,
    );
  }
}
