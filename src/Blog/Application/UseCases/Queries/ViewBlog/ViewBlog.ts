import { IQueryHandler } from '@nestjs/cqrs';
import { ViewBlogQuery } from './ViewBlog.query';
import BlogResponse from 'src/Blog/Application/Ports/Responses/Blog.response';

export interface ViewBlog extends IQueryHandler<ViewBlogQuery, BlogResponse> {}
