import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { PayloadGuard } from "src/common/Infrastructure/Input/Payload.guard";
import { CreateBlogDto } from "./DTOs/CrateBlogDto";
import { AddBlogCommand } from "src/Blog/Application/UseCase/Commands/AddBlog/AddBlogCommand";
import { UpdateBlogDto } from "./DTOs/UpdateBlogDto";
import { UpdateBlogCommand } from "src/Blog/Application/UseCase/Commands/UpdateBlog/UpdateBlogCommand";
import { DeleteBlogCommand } from "src/Blog/Application/UseCase/Commands/DeleteBlog/DeleteBlogCommand";
import { isAutherBlogGuard } from "./Guards/isAutherBlogGuard";
import { ViewBlogQuery } from "src/Blog/Application/UseCase/Queries/ViewBlog/ViewBlogQuery";
import BlogResponse from "src/Blog/Application/Ports/Responses/BlogResponse";
import { GetAllBlogsQuery } from "src/Blog/Application/UseCase/Queries/GetAllBlogs/GetAllBlogsQuery";

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

    @Put('/:blogId')
    @UseGuards(PayloadGuard, isAutherBlogGuard)
    async updateBlog(
        @Param('blogId') blogId: string,
        @Body() dto: UpdateBlogDto
    ) {
        await this.commandBus.execute<UpdateBlogCommand, void>(
            new UpdateBlogCommand(blogId, dto.title, dto.content)
        );

        return { message: 'blog update successfully' }
    }

    @Delete('/:blogId')
    @UseGuards(PayloadGuard, isAutherBlogGuard)
    async deleteBlog(@Param('blogId') blogId: string) {
        await this.commandBus.execute<DeleteBlogCommand, void>(
            new DeleteBlogCommand(blogId)
        );

        return { message: 'blog delete successfully' }
    }

    @Get()
    async getAll(
        @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
    ) {
        return this.queryBus.execute(
            new GetAllBlogsQuery(page, limit)
        );
    }

    @Get('/:blogId')
    @UseGuards(PayloadGuard)
    async getBlog(@Param('blogId') blogId: string) {
        return await this.queryBus.execute<ViewBlogQuery, BlogResponse>(
            new ViewBlogQuery(blogId)
        );
    }
}
