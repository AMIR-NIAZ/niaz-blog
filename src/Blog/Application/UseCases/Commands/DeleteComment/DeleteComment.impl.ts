import { CommandHandler } from '@nestjs/cqrs';
import BlogId from 'src/Blog/Domain/ValueObjects/BlogId';
import { BlogRepository } from 'src/Blog/Application/Ports/Blog.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { DeleteCommentCommand } from './DeleteComment.command';
import { DeleteComment } from './DeleteComment';
import CommentId from 'src/Blog/Domain/ValueObjects/CommentId';
import UserId from 'src/User/Domain/ValueObjects/UserId';

@CommandHandler(DeleteCommentCommand)
export class DeleteCommentImpl implements DeleteComment {
  constructor(
    @Inject(BlogRepository)
    private readonly blogRepository: BlogRepository,
  ) { }

  async execute(command: DeleteCommentCommand): Promise<void> {
    const blogId = BlogId.fromValid(command.blogId);
    const commentId = CommentId.fromValid(command.commentId);
    const userId = UserId.fromValid(command.userId);

    const blog = await this.blogRepository.loadById(blogId);
    if (!blog) throw new NotFoundException('blog not Found');

    blog.deleteComment(commentId, userId);

    await this.blogRepository.save(blog);
  }
}
