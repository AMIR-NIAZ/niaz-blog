import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Blog from "src/Blog/Domain/Blog";
import CreateNewBlog from "src/Blog/Domain/Events/CreateNewBlog";
import UpdateBlog from "src/Blog/Domain/Events/UpdateBlog";
import { Repository } from "typeorm";
import BlogMapper from "../Mapper/BlogMapper";
import { TypeOrmBlogEntity } from "./blog.entity";
import DeleteBlog from "src/Blog/Domain/Events/DeleteBlog";
import { BlogRepository } from "src/Blog/Application/Ports/BlogRepository";
import BlogId from "src/Blog/Domain/ValueObjects/BlogId";
import { Pagination } from "src/common/Application/Pagination";

@Injectable()
export class TypeOrmBlogRepository implements BlogRepository {
    constructor(
        @InjectRepository(TypeOrmBlogEntity)
        private readonly blogRepository: Repository<TypeOrmBlogEntity>
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

    async getAll(
        page: number,
        limit: number,
    ): Promise<Pagination<Blog>> {

        const [rows, total] = await this.blogRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: 'DESC',
            },
            relations: {
                author: true,
                comments: {
                    sender: true
                }
            }
        });

        const data = rows.map((blog) => BlogMapper.toDomain(blog))

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
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