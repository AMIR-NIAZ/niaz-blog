import { CommandHandler } from '@nestjs/cqrs';
import { DeleteBlogCommand } from './DeleteBlog.command';
import { DeleteBlog } from './DeleteBlog';
import BlogId from 'src/Blog/Domain/ValueObjects/BlogId';
import { BlogRepository } from 'src/Blog/Application/Ports/Blog.repository';
import { Inject } from '@nestjs/common';
import NotFoundException from 'src/Common/Domain/Exceptions/NotFound.exception';
import UserId from 'src/User/Domain/ValueObjects/UserId';
import Role from 'src/User/Domain/ValueObjects/Role';

@CommandHandler(DeleteBlogCommand)
export class DeleteBlogImpl implements DeleteBlog {
  constructor(
    @Inject(BlogRepository)
    private readonly blogRepository: BlogRepository,
  ) {}

  async execute(command: DeleteBlogCommand): Promise<void> {
    const id = BlogId.fromValid(command.blogId);
    const userId = UserId.fromValid(command.user.sub)
    const userRole = Role.fromInput(command.user.role)

    const blog = await this.blogRepository.loadById(id);
    if (!blog) throw new NotFoundException('blog not found');

    blog.delete(userId, userRole);

    await this.blogRepository.save(blog);
  }
}
