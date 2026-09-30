import { CommandHandler } from '@nestjs/cqrs';
import { AddComment } from './AddComment';
import { AddCommentCommand } from './AddComment.command';
import { Inject } from '@nestjs/common';
import { UserRepository } from 'src/User/Application/Ports/User.repository';
import { BlogRepository } from 'src/Blog/Application/Ports/Blog.repository';
import CommentText from 'src/Blog/Domain/ValueObjects/CommentText';
import UserId from 'src/User/Domain/ValueObjects/UserId';
import BlogId from 'src/Blog/Domain/ValueObjects/BlogId';
import { NotFoundException } from 'src/Common/Domain/Exceptions/NotFound.exception';

@CommandHandler(AddCommentCommand)
export class AddCommentImpl implements AddComment {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(BlogRepository)
    private readonly blogRepository: BlogRepository,
  ) {}

  async execute(command: AddCommentCommand): Promise<void> {
    const text = CommentText.fromInput(command.text);
    const blogId = BlogId.fromInput(command.blogId);
    const senderId = UserId.fromValid(command.senderId);

    const user = await this.userRepository.loadById(senderId.getValue);
    if (!user) throw new NotFoundException('Sender not Found');

    const blog = await this.blogRepository.loadById(blogId);
    if (!blog) throw new NotFoundException('blog not Found');

    blog.addComment(text, senderId);

    await this.blogRepository.save(blog);
  }
}
