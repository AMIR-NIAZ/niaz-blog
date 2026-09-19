import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmBlogEntity } from "./Infrastructure/Output/Persistence/TypeOrm/TypeOrmBlog.entity";
import { CqrsModule } from "@nestjs/cqrs";
import { BlogController } from "./Infrastructure/Input/Http/Controllers/Blog.controller";
import { JwtAppService } from "src/common/Infrastructure/Output/JwtToken.service";
import { TokenService } from "src/common/Application/Output/Token.service";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/User/Application/Ports/User.repsitory";
import { BlogRepository } from "./Application/Ports/Blog.repository";
import { TypeOrmBlogRepository } from "./Infrastructure/Output/Persistence/TypeOrm/TypeOrmBlog.repository";
import { AddBlogImpl } from "./Application/UseCases/Commands/AddBlog/addBlog.impl";
import { TypeOrmCommentEntity } from "./Infrastructure/Output/Persistence/TypeOrm/TypeOrmComment.entity";
import { UpdateBlogImpl } from "./Application/UseCases/Commands/UpdateBlog/updateBlog.impl";
import { DeleteBlogImpl } from "./Application/UseCases/Commands/DeleteBlog/deleteBlog.impl";
import { IncrementViewImpl } from "./Application/UseCases/Commands/IncrementView/incrementView.impl";
import { ViewBlogImpl } from "./Application/UseCases/Queries/ViewBlog/viewBlog.impl";
import { BlogViewedHandler } from "./Application/UseCases/EventsHandlers/blogViewed.handler";
import { GetAllBlogsImpl } from "./Application/UseCases/Queries/GetAllBlogs/getAllBlogs.impl";
import { TypeOrmUserEntity } from "src/User/Infrastructure/Output/Persistence/TypeOrm/TypeOrmUser.entity";
import { TypeOrmUserRepository } from "src/User/Infrastructure/Output/Persistence/TypeOrm/TypeOrmUser.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([TypeOrmBlogEntity, TypeOrmCommentEntity, TypeOrmUserEntity]),
        CqrsModule
    ],
    controllers: [
        BlogController
    ],
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
        GetAllBlogsImpl
    ]
})
export class BlogModule { }
