import { QueryHandler } from "@nestjs/cqrs";
import { GetAllBlogsQuery } from "./GetAllBlogsQuery";
import { GetAllBlogs } from "./GetAllBlogs";
import BlogResponse from "src/Blog/Application/Ports/Responses/BlogResponse";
import { Pagination } from "src/common/Application/Pagination";
import { Inject } from "@nestjs/common";
import { BlogRepository } from "src/Blog/Application/Ports/BlogRepository";
import BlogMapper from "src/Blog/Infrastructure/Output/Mapper/BlogMapper";

@QueryHandler(GetAllBlogsQuery)
export class GetAllBlogsImpl implements GetAllBlogs {
    constructor(
        @Inject(BlogRepository)
        private readonly blogRepository: BlogRepository
    ) { }

    async execute(query: GetAllBlogsQuery): Promise<Pagination<BlogResponse>> {
        const domainData = await this.blogRepository.getAll(query.page, query.limit)

        return {
            data: domainData.data.map(blog => BlogMapper.toResponse(blog)),
            total: domainData.total,
            page: domainData.page,
            limit: domainData.limit,
            totalPages: domainData.totalPages,
        };
    }
}
