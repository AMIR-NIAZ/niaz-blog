import { IQueryHandler } from '@nestjs/cqrs';
import { GetAllBlogsQuery } from './getAllBlogs.query';
import { Pagination } from 'src/common/Application/Pagination';
import BlogResponse from 'src/Blog/Application/Ports/Responses/Blog.response';

export interface GetAllBlogs extends IQueryHandler<
  GetAllBlogsQuery,
  Pagination<BlogResponse>
> {}
