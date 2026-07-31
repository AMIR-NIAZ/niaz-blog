import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogEntity } from "./Infrastructure/Output/TypeOrm/blog.entity";
import { UserEntity } from "src/User/Infrastructure/Output/TypeOrm/user.entity";
import { CqrsModule } from "@nestjs/cqrs";
import { blogController } from "./Infrastructure/Input/blogController";
import { JwtAppService } from "src/common/Infrastructure/Output/JwtToken.service";
import { TokenService } from "src/common/Application/Output/TokenService";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/User/Application/Output/UserRepsitory";
import { TypeOrmUserRepository } from "src/User/Infrastructure/Output/TypeOrm/TypeOrm.repository";
import { BlogRepository } from "./Application/OutPut/BlogRepository";
import { TypeOrmBlogRepository } from "./Infrastructure/Output/TypeOrm/TypeOrmBlogRepository";
import { AddBlogImpl } from "./Application/UseCase/Commands/AddBlog/AddBlogImpl";
import { CommentEntity } from "./Infrastructure/Output/TypeOrm/comment.entity";
import { UpdateBlogImpl } from "./Application/UseCase/Commands/UpdateBlog/UpdateBlogImpl";
import { DeleteBlogImpl } from "./Application/UseCase/Commands/DeleteBlog/DeleteBlogImpl";
import { IncrementViewImpl } from "./Application/UseCase/Commands/IncrementView/IncrementViewImpl";
import { ViewBlogImpl } from "./Application/UseCase/Queries/ViewBlog/ViewBlogImpl";
import { BlogViewedHandler } from "./Application/UseCase/EventsHandler/BlogViewedHandler";

@Module({
    imports: [
        TypeOrmModule.forFeature([BlogEntity, CommentEntity, UserEntity]),
        CqrsModule
    ],
    controllers: [
        blogController
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
        IncrementViewImpl
    ]
})
export class BlogModule { }
