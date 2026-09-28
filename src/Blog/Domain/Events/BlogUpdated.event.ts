import DomainEvent from 'src/Common/Domain/DomainEvent';
import Blog from '../Entities/Blog';

export default class UpdateBlog extends DomainEvent {
  constructor(public readonly blogId: string) {
    super();
  }

  static of(blog: Blog) {
    return new UpdateBlog(blog.id.getValue);
  }
}
