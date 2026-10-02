import { CommandHandler } from '@nestjs/cqrs';
import { AddComment } from './UpdateComment';
import { Inject } from '@nestjs/common';
import { BlogRepository } from 'src/Blog/Application/Ports/Blog.repository';
import CommentText from 'src/Blog/Domain/ValueObjects/CommentText';
import UserId from 'src/User/Domain/ValueObjects/UserId';
import BlogId from 'src/Blog/Domain/ValueObjects/BlogId';
import NotFoundException from 'src/Common/Domain/Exceptions/NotFound.exception';
import { UpdateCommentCommand } from './UpdateComment.command';
import CommentId from 'src/Blog/Domain/ValueObjects/CommentId';

@CommandHandler(UpdateCommentCommand)
export class UpdateCommentImpl implements AddComment {
  constructor(
    @Inject(BlogRepository)
    private readonly blogRepository: BlogRepository,
  ) {}

  async execute(command: UpdateCommentCommand): Promise<void> {
    const text = CommentText.fromInput(command.text);
    const blogId = BlogId.fromValid(command.blogId);
    const commentId = CommentId.fromValid(command.commentId);
    const userId = UserId.fromValid(command.userId);

    const blog = await this.blogRepository.loadById(blogId);
    if (!blog) throw new NotFoundException('blog not Found');

    blog.editComment(commentId, userId, text);

    await this.blogRepository.save(blog);
  }
}
