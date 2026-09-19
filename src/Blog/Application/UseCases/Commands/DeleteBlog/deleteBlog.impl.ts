import { CommandHandler } from '@nestjs/cqrs';
import { DeleteBlogCommand } from './deleteBlog.command';
import { DeleteBlog } from './deleteBlog';
import BlogId from 'src/Blog/Domain/ValueObjects/BlogId';
import { BlogRepository } from 'src/Blog/Application/Ports/Blog.repository';
import { Inject } from '@nestjs/common';

@CommandHandler(DeleteBlogCommand)
export class DeleteBlogImpl implements DeleteBlog {
  constructor(
    @Inject(BlogRepository)
    private readonly blogRepository: BlogRepository,
  ) {}

  async execute(command: DeleteBlogCommand): Promise<void> {
    const id = BlogId.fromValid(command.blogId);

    const blog = await this.blogRepository.loadById(id);
    if (!blog) throw new Error();

    blog.delete();

    await this.blogRepository.save(blog);
  }
}
