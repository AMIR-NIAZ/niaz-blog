import { IQueryHandler } from "@nestjs/cqrs";
import { ViewBlogQuery } from "./ViewBlogQuery";
import BlogResponse from "src/Blog/Application/OutPut/Responses/BlogResponse";

export interface ViewBlog extends IQueryHandler<ViewBlogQuery, BlogResponse> {}