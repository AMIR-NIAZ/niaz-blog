import DomainEvent from 'src/Common/Domain/DomainEvent';
import Blog from '../Entities/Blog';

export default class DeleteBlog extends DomainEvent {
  constructor(public readonly blogId: string) {
    super();
  }

  static of(blog: Blog) {
    return new DeleteBlog(blog.id.getValue);
  }
}
