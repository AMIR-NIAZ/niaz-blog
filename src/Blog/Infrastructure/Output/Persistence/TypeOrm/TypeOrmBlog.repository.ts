import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Blog from 'src/Blog/Domain/Entities/Blog';
import CreateNewBlog from 'src/Blog/Domain/Events/BlogCreated.event';
import UpdateBlog from 'src/Blog/Domain/Events/BlogUpdated.event';
import { Repository } from 'typeorm';
import BlogMapper from './Mapper/TypeOrmBlog.mapper';
import { TypeOrmBlogEntity } from './TypeOrmBlog.entity';
import DeleteBlog from 'src/Blog/Domain/Events/BlogDeleted.event';
import { BlogRepository } from 'src/Blog/Application/Ports/Blog.repository';
import BlogId from 'src/Blog/Domain/ValueObjects/BlogId';
import { Pagination } from 'src/Common/Application/Pagination';
import AddComment from 'src/Blog/Domain/Events/CommentAdded.event';
import Comment from 'src/Blog/Domain/Entities/Comment';
import { TypeOrmCommentEntity } from './TypeOrmComment.entity';
import CommentMapper from './Mapper/TypeOrmComment.mapper';
import CommentEdited from 'src/Blog/Domain/Events/CommentEdited.event';
import CommentDeleted from 'src/Blog/Domain/Events/CommentDeleted.event';

@Injectable()
export class TypeOrmBlogRepository implements BlogRepository {
  constructor(
    @InjectRepository(TypeOrmBlogEntity)
    private readonly blogRepository: Repository<TypeOrmBlogEntity>,
    @InjectRepository(TypeOrmCommentEntity)
    private readonly commentRepository: Repository<TypeOrmCommentEntity>,
  ) { }

  async save(blog: Blog): Promise<void> {
    const events = blog.getEvents();

    for (const event of events) {
      if (event instanceof CreateNewBlog) {
        await this.create(blog);
      }

      if (event instanceof UpdateBlog) {
        await this.update(blog);
      }

      if (event instanceof DeleteBlog) {
        await this.delete(blog);
      }

      if (event instanceof AddComment) {
        await this.addComment(
          blog.id,
          blog.comments.find(
            (comment) => comment.id.getValue === event.commentId,
          )!,
        );
      }

      if (event instanceof CommentEdited) {
        await this.updateComment(
          blog.id,
          blog.comments.find(
            (comment) => comment.id.getValue === event.commentId,
          )!,
        );
      }

      if (event instanceof CommentDeleted) {
        this.DeleteCommentCommand(event.commentId)
      }
    }
  }

  async loadById(id: BlogId) {
    const blog = await this.blogRepository.findOne({
      where: {
        id: id.getValue,
      },
      relations: {
        author: true,
        comments: {
          sender: true,
        },
      },
    });

    return blog ? BlogMapper.toDomain(blog) : null;
  }

  async getAll(page: number, limit: number): Promise<Pagination<Blog>> {
    const [rows, total] = await this.blogRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
      relations: {
        author: true,
        comments: {
          sender: true,
        },
      },
    });

    const data = rows.map((blog) => BlogMapper.toDomain(blog));

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  private async create(blog: Blog) {
    const blogDocument = BlogMapper.toPersistence(blog);

    await this.blogRepository.save(blogDocument);
  }

  private async update(blog: Blog) {
    const blogDocument = BlogMapper.toPersistence(blog);

    await this.blogRepository.save(blogDocument);
  }

  private async delete(blog: Blog) {
    const blogId = blog.id.getValue;

    await this.blogRepository.delete(blogId);
  }

  private async addComment(blogId: BlogId, comment: Comment) {
    const commentDocument = CommentMapper.toPersistence(comment, blogId);

    await this.commentRepository.save(commentDocument);
  }

  private async updateComment(blogId: BlogId, comment: Comment) {
    const commentDocument = CommentMapper.toPersistence(comment, blogId);

    await this.commentRepository.save(commentDocument);
  }

  private async DeleteCommentCommand(commentId: string) {
    await this.commentRepository.delete(commentId)
  }
}
