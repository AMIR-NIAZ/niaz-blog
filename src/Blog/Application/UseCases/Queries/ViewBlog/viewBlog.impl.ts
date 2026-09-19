import { EventBus, QueryHandler } from '@nestjs/cqrs';
import { ViewBlogQuery } from './viewBlog.query';
import { ViewBlog } from './viewBlog';
import { Inject } from '@nestjs/common';
import { BlogRepository } from 'src/Blog/Application/Ports/Blog.repository';
import BlogId from 'src/Blog/Domain/ValueObjects/BlogId';
import BlogMapper from 'src/Blog/Infrastructure/Output/Persistence/TypeOrm/Mapper/TypeOrmBlog.mapper';
import BlogResponse from 'src/Blog/Application/Ports/Responses/Blog.response';
import BlogViewed from 'src/Blog/Domain/Events/BlogViewed.event';

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
    if (!blog) throw new Error('blog Not Find');

    this.eventBus.publish(BlogViewed.of(blog));

    return BlogMapper.toResponse(blog);
  }
}
