import { EventBus, QueryHandler } from "@nestjs/cqrs";
import { ViewBlogQuery } from "./ViewBlogQuery";
import { ViewBlog } from "./ViewBlog";
import { Inject } from "@nestjs/common";
import { BlogRepository } from "src/Blog/Application/OutPut/BlogRepository";
import BlogId from "src/Blog/Domain/ValueObjects/BlogId";
import BlogMapper from "src/Blog/Infrastructure/Output/Mapper/BlogMapper";
import BlogResponse from "src/Blog/Application/OutPut/Responses/BlogResponse";
import BlogViewedEvent from "src/Blog/Domain/Events/BlogViewedEvent";

@QueryHandler(ViewBlogQuery)
export class ViewBlogImpl implements ViewBlog {
    constructor(
        @Inject(BlogRepository)
        private readonly blogRepository: BlogRepository,
        private readonly eventBus: EventBus,
    ) { }
    async execute(query: ViewBlogQuery): Promise<BlogResponse> {
        const blogId = BlogId.fromInput(query.blogId)

        const blog = await this.blogRepository.loadById(blogId);
        if (!blog)
            throw new Error('blog Not Find')
        
        this.eventBus.publish(BlogViewedEvent.of(blog))

        return BlogMapper.toResponse(blog);
    }
}
