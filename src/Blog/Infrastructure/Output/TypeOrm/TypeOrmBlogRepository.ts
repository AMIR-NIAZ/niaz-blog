import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Blog from "src/Blog/Domain/Blog";
import CreateNewBlog from "src/Blog/Domain/Events/CreateNewBlog";
import UpdateBlog from "src/Blog/Domain/Events/UpdateBlog";
import { Repository } from "typeorm";
import BlogMapper from "../Mapper/BlogMapper";
import { BlogEntity } from "./blog.entity";
import DeleteBlog from "src/Blog/Domain/Events/DeleteBlog";
import { BlogRepository } from "src/Blog/Application/OutPut/BlogRepository";
import BlogId from "src/Blog/Domain/ValueObjects/BlogId";

@Injectable()
export class TypeOrmBlogRepository implements BlogRepository {
    constructor(
        @InjectRepository(BlogEntity)
        private readonly blogRepository: Repository<BlogEntity>
    ) { }

    async save(blog: Blog): Promise<void> {
        const events = blog.getEvents()

        for (const event of events) {
            if (event instanceof CreateNewBlog) {
                await this.create(blog)
            }
            if (event instanceof UpdateBlog) {
                await this.update(blog)
            }
            if (event instanceof DeleteBlog) {
                await this.delete(blog)
            }
        }
    }

    async loadById(id: BlogId) {
        const blog = await this.blogRepository.findOne({
            where: {
                id: id.getValue
            },
            relations: {
                author: true,
                comments: {
                    sender: true
                }
            }
        });

        return blog ? BlogMapper.toDomain(blog) : null;
    }

    private async create(blog: Blog) {
        const blogDocument = BlogMapper.toPersistence(blog)
        try {
            await this.blogRepository.save(blogDocument)
        } catch (err) {
            console.log(err);
        }
    }

    private async update(blog: Blog) {
        const blogDocument = BlogMapper.toPersistence(blog)

        try {
            await this.blogRepository.save(blogDocument)
        } catch (err) {
            console.log(err);
        }
    }

    private async delete(blog: Blog) {
        const blogId = blog.id.getValue

        try {
            await this.blogRepository.delete(blogId)
        } catch (err) {
            console.log(err);
        }
    }
}