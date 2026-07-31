import Blog from "src/Blog/Domain/Blog";
import BlogId from "src/Blog/Domain/ValueObjects/BlogId";

export const BlogRepository = Symbol('BlogRepository')
export interface BlogRepository {
  save(blog: Blog): Promise<void>;
  loadById(id: BlogId): Promise<Blog | null>
}