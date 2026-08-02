import { IQueryHandler } from "@nestjs/cqrs";
import { ViewBlogQuery } from "./ViewBlogQuery";
import BlogResponse from "src/Blog/Application/Ports/Responses/BlogResponse";

export interface ViewBlog extends IQueryHandler<ViewBlogQuery, BlogResponse> {}