import DomainEvent from 'src/Common/Domain/DomainEvent';
import Comment from '../Entities/Comment';

export default class AddComment extends DomainEvent {
  constructor(public readonly commentId: string) {
    super();
  }

  static of(comment: Comment) {
    return new AddComment(comment.id.getValue);
  }
}
