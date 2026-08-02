import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Inject,
    Injectable,
} from '@nestjs/common';
import { BlogRepository } from 'src/Blog/Application/Ports/BlogRepository';
import BlogId from 'src/Blog/Domain/ValueObjects/BlogId';
import UserId from 'src/Blog/Domain/ValueObjects/UserId';
import { Payload } from 'src/common/Application/payload';

@Injectable()
export class isAutherBlogGuard implements CanActivate {
    constructor(
        @Inject(BlogRepository)
        private readonly blogRepository: BlogRepository,
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const Http = context.switchToHttp()
        const request = Http.getRequest()
        const user = Http.getRequest()['user'] as Payload
        const userId = UserId.fromValid(user.sub)

        const blogId = BlogId.fromInput(request.params['blogId'] as string)
        if (!blogId)
            throw new ForbiddenException('blogid invalid')

        const blog = await this.blogRepository.loadById(blogId)
        if(!blog)
            throw new ForbiddenException('blog not find')
        if (!blog.userId.equals(userId)) 
            throw new ForbiddenException('user not auther this blog')

        return true
    }
}