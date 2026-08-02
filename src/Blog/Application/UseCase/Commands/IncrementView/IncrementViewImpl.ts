import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { IncrementViewCommand } from "./IncrementViewCommand";
import { IncrementView } from "./IncrementView";
import { Inject } from "@nestjs/common";
import { BlogRepository } from "src/Blog/Application/Ports/BlogRepository";
import BlogId from "src/Blog/Domain/ValueObjects/BlogId";

@CommandHandler(IncrementViewCommand)
export class IncrementViewImpl implements IncrementView {

    constructor(
        @Inject(BlogRepository)
        private readonly blogRepository: BlogRepository,
    ) { }

    async execute(command: IncrementViewCommand): Promise<void> {
        const blogId = BlogId.fromValid(command.blogId)

        const blog = await this.blogRepository.loadById(blogId);

        if (!blog)
            return;

        blog.incrementView();

        await this.blogRepository.save(blog);
    }
}
