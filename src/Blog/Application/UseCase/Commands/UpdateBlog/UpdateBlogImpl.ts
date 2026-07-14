import { CommandHandler } from "@nestjs/cqrs";
import { UpdateBlogCommand } from "./UpdateBlogCommand";
import { UpdateBlog } from "./UpdateBlog";
import Title from "src/Blog/Domain/ValueObjects/Title";
import Content from "src/Blog/Domain/ValueObjects/Content";
import { Inject } from "@nestjs/common";
import { BlogRepository } from "src/Blog/Application/OutPut/BlogRepository";

@CommandHandler(UpdateBlogCommand)
export class UpdateBlogImpl implements UpdateBlog {
    constructor(
        @Inject(BlogRepository)
        private readonly blogRepository: BlogRepository
    ) { }
    async execute(command: UpdateBlogCommand): Promise<void> {
        const blogId = Title.fromInput(command.blogId)
        const title = Title.fromInput(command.title)
        const content = Content.fromInput(command.content)

        const blog = await this.blogRepository.loadById(blogId.getValue)
        if (!blog)
            throw Error()

        blog.update(title, content)

        await this.blogRepository.save(blog)
    }
}