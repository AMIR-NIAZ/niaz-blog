import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmBlogEntity } from './Infrastructure/Output/Persistence/TypeOrm/TypeOrmBlog.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { BlogController } from './Infrastructure/Input/Http/Controllers/Blog.controller';
import { JwtAppService } from 'src/Common/Infrastructure/Output/JwtToken.service';
import { TokenService } from 'src/Common/Application/Output/Token.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/User/Application/Ports/User.repository';
import { BlogRepository } from './Application/Ports/Blog.repository';
import { TypeOrmBlogRepository } from './Infrastructure/Output/Persistence/TypeOrm/TypeOrmBlog.repository';
import { AddBlogImpl } from './Application/UseCases/Commands/AddBlog/AddBlog.impl';
import { TypeOrmCommentEntity } from './Infrastructure/Output/Persistence/TypeOrm/TypeOrmComment.entity';
import { UpdateBlogImpl } from './Application/UseCases/Commands/UpdateBlog/UpdateBlog.impl';
import { DeleteBlogImpl } from './Application/UseCases/Commands/DeleteBlog/DeleteBlog.impl';
import { IncrementViewImpl } from './Application/UseCases/Commands/IncrementView/IncrementView.impl';
import { ViewBlogImpl } from './Application/UseCases/Queries/ViewBlog/ViewBlog.impl';
import { BlogViewedHandler } from './Application/UseCases/EventHandlers/BlogViewed.handler';
import { GetAllBlogsImpl } from './Application/UseCases/Queries/GetAllBlogs/GetAllBlogs.impl';
import { TypeOrmUserEntity } from 'src/User/Infrastructure/Output/Persistence/TypeOrm/TypeOrmUser.entity';
import { TypeOrmUserRepository } from 'src/User/Infrastructure/Output/Persistence/TypeOrm/TypeOrmUser.repository';
import { AddCommentImpl } from './Application/UseCases/Commands/AddComment/AddComment.impl';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeOrmBlogEntity,
      TypeOrmCommentEntity,
      TypeOrmUserEntity,
    ]),
    CqrsModule,
  ],
  controllers: [BlogController],
  providers: [
    {
      provide: UserRepository,
      useClass: TypeOrmUserRepository,
    },
    {
      provide: BlogRepository,
      useClass: TypeOrmBlogRepository,
    },
    {
      provide: TokenService,
      useClass: JwtAppService,
    },
    JwtService,
    AddBlogImpl,
    UpdateBlogImpl,
    DeleteBlogImpl,
    ViewBlogImpl,
    BlogViewedHandler,
    IncrementViewImpl,
    GetAllBlogsImpl,
    AddCommentImpl,
  ],
})
export class BlogModule {}
