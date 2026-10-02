import { EventBus, QueryHandler } from '@nestjs/cqrs';
import { ViewBlogQuery } from './ViewBlog.query';
import { ViewBlog } from './ViewBlog';
import { Inject } from '@nestjs/common';
import { BlogRepository } from 'src/Blog/Application/Ports/Blog.repository';
import BlogId from 'src/Blog/Domain/ValueObjects/BlogId';
import BlogMapper from 'src/Blog/Infrastructure/Output/Persistence/TypeOrm/Mapper/TypeOrmBlog.mapper';
import BlogResponse from 'src/Blog/Application/Ports/Responses/Blog.response';
import BlogViewed from 'src/Blog/Domain/Events/BlogViewed.event';
import NotFoundException from 'src/Common/Domain/Exceptions/NotFound.exception';

@QueryHandler(ViewBlogQuery)
export class ViewBlogImpl implements ViewBlog {
  constructor(
    @Inject(BlogRepository)
    private readonly blogRepository: BlogRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(query: ViewBlogQuery): Promise<BlogResponse> {
    const blogId = BlogId.fromInput(query.blogId);

    const blog = await this.blogRepository.loadById(blogId);
    if (!blog) throw new NotFoundException('blog not found');

    this.eventBus.publish(BlogViewed.of(blog));

    return BlogMapper.toResponse(blog);
  }
}
