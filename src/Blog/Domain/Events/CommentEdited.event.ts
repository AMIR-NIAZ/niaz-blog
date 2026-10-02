import DomainEvent from 'src/Common/Domain/DomainEvent';
import CommentId from '../ValueObjects/CommentId';

export default class CommentEdited extends DomainEvent {
  constructor(public readonly commentId: string) {
    super();
  }

  static of(commentId: CommentId) {
    return new CommentEdited(commentId.getValue);
  }
}
