import Entity from 'src/Common/Domain/Entity';
import CommentId from '../ValueObjects/CommentId';
import CommentText from '../ValueObjects/CommentText';
import UserId from '../ValueObjects/UserId';

export default class Comment extends Entity {
  constructor(
    id: CommentId,
    public text: CommentText,
    public readonly userId: UserId,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {
    super(id);
  }

  static create(text: CommentText, senterId: UserId) {
    return new Comment(CommentId.create(), text, senterId);
  }

  public edit(text: CommentText): void {
    this.text = text;
    this.updatedAt = new Date();
  }

  public isOwnedBy(userId: UserId): boolean {
    return this.userId.equals(userId);
  }
}
