import { Body, Controller, Post, Put, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { PayloadGuard } from "src/common/Infrastructure/Input/Payload.guard";
import { CreateBlogDto } from "./DTOs/CrateBlogDto";
import { AddBlogCommand } from "src/Blog/Application/UseCase/Commands/AddBlog/AddBlogCommand";
import { UpdateBlogDto } from "./DTOs/UpdateBlogDto";
import { UpdateBlogCommand } from "src/Blog/Application/UseCase/Commands/UpdateBlog/UpdateBlogCommand";

@Controller('blogs')
export class blogController {
    public constructor(
        private commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post()
    @UseGuards(PayloadGuard)
    async createBlog(@Body() dto: CreateBlogDto) {
        await this.commandBus.execute<AddBlogCommand, void>(
            new AddBlogCommand(dto.title, dto.content, dto.userId)
        );

        return { message: 'blog create successfully' }
    }

    @Put()
    async updstrBlog(@Body() dto: UpdateBlogDto) {
        await this.commandBus.execute<UpdateBlogCommand, void>(
            new UpdateBlogCommand(dto.blogId, dto.title, dto.content)
        );

        return { message: 'blog update successfully' }
    }
}
