import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PayloadGuard } from 'src/Common/Infrastructure/Input/Guards/Payload.guard';
import { CreateBlogDto } from '../Dtos/CreateBlog.dto';
import { AddBlogCommand } from 'src/Blog/Application/UseCases/Commands/AddBlog/AddBlog.command';
import { UpdateBlogDto } from '../Dtos/UpdateBlog.dto';
import { UpdateBlogCommand } from 'src/Blog/Application/UseCases/Commands/UpdateBlog/UpdateBlog.command';
import { DeleteBlogCommand } from 'src/Blog/Application/UseCases/Commands/DeleteBlog/DeleteBlog.command';
import { IsAutherBlogGuard } from '../Guards/IsAuthorBlog.guard';
import { ViewBlogQuery } from 'src/Blog/Application/UseCases/Queries/ViewBlog/ViewBlog.query';
import BlogResponse from 'src/Blog/Application/Ports/Responses/Blog.response';
import { GetAllBlogsQuery } from 'src/Blog/Application/UseCases/Queries/GetAllBlogs/GetAllBlogs.query';
import { CurrentUser } from 'src/Common/Infrastructure/Input/Decorators/CurrentUser.decorator';
import { CreateCommentDto } from '../Dtos/CreateComment.dto';
import { AddCommentCommand } from 'src/Blog/Application/UseCases/Commands/AddComment/AddComment.command';
import { EditCommentDto } from '../Dtos/EditComment.dto';
import { UpdateCommentCommand } from 'src/Blog/Application/UseCases/Commands/UpdateComment/UpdateComment.command';
import { DeleteCommentCommand } from 'src/Blog/Application/UseCases/Commands/DeleteComment/DeleteComment.command';

@Controller('blogs')
export class BlogController {
  public constructor(
    private commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(PayloadGuard)
  async createBlog(@Body() dto: CreateBlogDto, @CurrentUser() userId: string) {
    await this.commandBus.execute<AddBlogCommand, void>(
      new AddBlogCommand(dto.title, dto.content, userId),
    );

    return { message: 'blog create successfully' };
  }

  @Put('/:blogId')
  @UseGuards(PayloadGuard, IsAutherBlogGuard)
  async updateBlog(
    @Param('blogId') blogId: string,
    @Body() dto: UpdateBlogDto,
  ) {
    await this.commandBus.execute<UpdateBlogCommand, void>(
      new UpdateBlogCommand(blogId, dto.title, dto.content),
    );

    return { message: 'blog update successfully' };
  }

  @Delete('/:blogId')
  @UseGuards(PayloadGuard, IsAutherBlogGuard)
  async deleteBlog(@Param('blogId') blogId: string) {
    await this.commandBus.execute<DeleteBlogCommand, void>(
      new DeleteBlogCommand(blogId),
    );

    return { message: 'blog delete successfully' };
  }

  @Get()
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.queryBus.execute(new GetAllBlogsQuery(page, limit));
  }

  @Get('/:blogId')
  @UseGuards(PayloadGuard)
  async getBlog(@Param('blogId') blogId: string) {
    return await this.queryBus.execute<ViewBlogQuery, BlogResponse>(
      new ViewBlogQuery(blogId),
    );
  }

  @Post(':blogId/comments')
  @UseGuards(PayloadGuard)
  async addNewComment(
    @Param('blogId') blogId: string,
    @CurrentUser() userId: string,
    @Body() dto: CreateCommentDto,
  ) {
    await this.commandBus.execute<AddCommentCommand, void>(
      new AddCommentCommand(dto.text, blogId, userId),
    );

    return { message: 'add comment successfully' };
  }

  @Patch(':blogId/comments/:commentId')
  @UseGuards(PayloadGuard)
  async editComment(
    @Param('blogId') blogId: string,
    @Param('commentId') commentId: string,
    @Body() dto: EditCommentDto,
    @CurrentUser() userId: string,
  ) {
    await this.commandBus.execute<UpdateCommentCommand, void>(
      new UpdateCommentCommand(dto.text, blogId, commentId, userId),
    );

    return { message: 'update comment successfully' };
  }

  @Delete(':blogId/comments/:commentId')
  @UseGuards(PayloadGuard)
  async removeComment(
    @Param('blogId') blogId: string,
    @Param('commentId') commentId: string,
    @CurrentUser() userId: string,
  ) {
    await this.commandBus.execute<DeleteCommentCommand, void>(
      new DeleteCommentCommand(blogId, commentId, userId),
    );
  }
}
