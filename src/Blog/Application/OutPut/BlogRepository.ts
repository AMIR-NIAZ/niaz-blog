import Blog from "src/Blog/Domain/Blog";

export const BlogRepository = Symbol('BlogRepository')
export interface BlogRepository {
  save(blog: Blog): Promise<void>;
  loadById(id: string): Promise<Blog | null>
}