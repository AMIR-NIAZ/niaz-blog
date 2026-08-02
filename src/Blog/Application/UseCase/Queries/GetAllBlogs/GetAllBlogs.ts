import { IQueryHandler } from "@nestjs/cqrs";
import { GetAllBlogsQuery } from "./GetAllBlogsQuery";
import { Pagination } from "src/common/Application/Pagination";
import BlogResponse from "src/Blog/Application/Ports/Responses/BlogResponse";

export interface GetAllBlogs extends IQueryHandler<GetAllBlogsQuery, Pagination<BlogResponse>> { }
