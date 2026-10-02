import DomainEvent from 'src/Common/Domain/DomainEvent';
import Comment from '../Entities/Comment';

export default class CommentDeleted extends DomainEvent {
  constructor(public readonly commentId: string) {
    super();
  }

  static of(comment: Comment) {
    return new CommentDeleted(comment.id.getValue);
  }
}
