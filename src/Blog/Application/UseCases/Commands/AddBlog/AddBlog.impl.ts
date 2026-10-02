import Title from 'src/Blog/Domain/ValueObjects/Title';
import Content from '../../../../Domain/ValueObjects/Content';
import { AddBlog } from './AddBlog';
import { AddBlogCommand } from './AddBlog.command';
import { Inject } from '@nestjs/common';
import { UserRepository } from 'src/User/Application/Ports/User.repository';
import NotFoundException from 'src/Common/Domain/Exceptions/NotFound.exception';
import Blog from 'src/Blog/Domain/Entities/Blog';
import { BlogRepository } from 'src/Blog/Application/Ports/Blog.repository';
import { CommandHandler } from '@nestjs/cqrs';
import UserId from 'src/User/Domain/ValueObjects/UserId';

@CommandHandler(AddBlogCommand)
export class AddBlogImpl implements AddBlog {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(BlogRepository)
    private readonly blogRepository: BlogRepository,
  ) {}
  async execute(command: AddBlogCommand): Promise<void> {
    const title = Title.fromInput(command.title);
    const content = Content.fromInput(command.content);
    const userId = UserId.fromValid(command.userId);

    const user = await this.userRepository.loadById(userId.getValue);
    if (!user) throw new NotFoundException('Auther not Found');

    const blog = Blog.create(title, content, userId);

    await this.blogRepository.save(blog);
  }
}
