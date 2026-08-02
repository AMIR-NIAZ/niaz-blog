import Title from "src/Blog/Domain/ValueObjects/Title";
import Content from "../../../../Domain/ValueObjects/Content";
import UserId from "../../../../Domain/ValueObjects/UserId";
import { AddBlog } from "./AddBlog";
import { AddBlogCommand } from "./AddBlogCommand";
import { Inject } from "@nestjs/common";
import { UserRepository } from "src/User/Application/Output/UserRepsitory";
import { NotFoundException } from "src/common/Domain/Exceptions/NotFoundException";
import Blog from "src/Blog/Domain/Blog";
import { BlogRepository } from "src/Blog/Application/Ports/BlogRepository";
import { CommandHandler } from "@nestjs/cqrs";

@CommandHandler(AddBlogCommand)
export class AddBlogImpl implements AddBlog {
    constructor(
        @Inject(UserRepository)
        private readonly userRepository: UserRepository,
        @Inject(BlogRepository)
        private readonly blogRepository: BlogRepository,
    ) { }
    async execute(command: AddBlogCommand): Promise<void> {
        const title = Title.fromInput(command.title)
        const content = Content.fromInput(command.content)
        const userId = UserId.fromValid(command.userId)

        const user = await this.userRepository.loadById(userId.getValue)
        if (!user)
            throw new NotFoundException('Auther not Found')

        const blog = Blog.create(title, content, userId)

        await this.blogRepository.save(blog)
    }
}
