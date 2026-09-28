import { QueryHandler } from '@nestjs/cqrs';
import { GetAllBlogsQuery } from './GetAllBlogs.query';
import { GetAllBlogs } from './GetAllBlogs';
import BlogResponse from 'src/Blog/Application/Ports/Responses/Blog.response';
import { Pagination } from 'src/Common/Application/Pagination';
import { Inject } from '@nestjs/common';
import { BlogRepository } from 'src/Blog/Application/Ports/Blog.repository';
import BlogMapper from 'src/Blog/Infrastructure/Output/Persistence/TypeOrm/Mapper/TypeOrmBlog.mapper';

@QueryHandler(GetAllBlogsQuery)
export class GetAllBlogsImpl implements GetAllBlogs {
  constructor(
    @Inject(BlogRepository)
    private readonly blogRepository: BlogRepository,
  ) {}

  async execute(query: GetAllBlogsQuery): Promise<Pagination<BlogResponse>> {
    const domainData = await this.blogRepository.getAll(
      query.page,
      query.limit,
    );

    return {
      data: domainData.data.map((blog) => BlogMapper.toResponse(blog)),
      total: domainData.total,
      page: domainData.page,
      limit: domainData.limit,
      totalPages: domainData.totalPages,
    };
  }
}
