import { IQueryHandler } from '@nestjs/cqrs';
import { GetAllBlogsQuery } from './GetAllBlogs.query';
import { Pagination } from 'src/Common/Application/Pagination';
import BlogResponse from 'src/Blog/Application/Ports/Responses/Blog.response';

export interface GetAllBlogs extends IQueryHandler<
  GetAllBlogsQuery,
  Pagination<BlogResponse>
> {}
