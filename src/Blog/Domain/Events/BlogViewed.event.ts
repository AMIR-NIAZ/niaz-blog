import DomainEvent from 'src/Common/Domain/DomainEvent';
import Blog from '../Entities/Blog';

export default class BlogViewed extends DomainEvent {
  constructor(public readonly blogId: string) {
    super();
  }

  static of(blog: Blog) {
    return new BlogViewed(blog.id.getValue);
  }
}
