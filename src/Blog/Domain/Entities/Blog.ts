import AggregateRoot from 'src/Common/Domain/AggregateRoot';
import Title from '../ValueObjects/Title';
import Content from '../ValueObjects/Content';
import BlogId from '../ValueObjects/BlogId';
import Comment from './Comment';
import CreateNewBlog from '../Events/BlogCreated.event';
import DeleteBlog from '../Events/BlogDeleted.event';
import CommentText from '../ValueObjects/CommentText';
import AddComment from '../Events/CommentAdded.event';
import UpdateBlog from '../Events/BlogUpdated.event';
import ViewCount from '../ValueObjects/ViewCount';
import CommentId from '../ValueObjects/CommentId';
import CommentEdited from '../Events/CommentEdited.event';
import UserId from 'src/User/Domain/ValueObjects/UserId';
import CommentDeleted from '../Events/CommentDeleted.event';

export default class Blog extends AggregateRoot {
  constructor(
    public id: BlogId,
    public title: Title,
    public content: Content,
    public userId: UserId,
    public viewCount: ViewCount,
    public comments: Comment[] = [],
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {
    super(id);
  }

  static create(title: Title, content: Content, userId: UserId) {
    const id = BlogId.create();
    const viewCount = ViewCount.fromValid(0);
    const blog = new Blog(id, title, content, userId, viewCount);

    blog.addEvent(CreateNewBlog.of(id, userId));

    return blog;
  }

  update(title: Title, content: Content) {
    this.title = title;
    this.content = content;

    this.addEvent(UpdateBlog.of(this));
  }

  delete() {
    this.addEvent(DeleteBlog.of(this));
  }

  incrementView() {
    this.viewCount = ViewCount.fromValid(this.viewCount.getValue + 1);

    this.addEvent(UpdateBlog.of(this));
  }

  // aggregate methods
  addComment(text: CommentText, senderId: UserId) {
    const comment = Comment.create(text, senderId);
    this.comments.push(comment);

    this.addEvent(AddComment.of(comment));
  }

  editComment(commentId: CommentId, editorId: UserId, newText: CommentText) {
    const comment = this.comments.find((c) => c.id.equals(commentId));

    console.log(comment?.userId.getValue, typeof comment?.userId.getValue);
    console.log(editorId.getValue, typeof editorId.getValue);
    console.log(comment?.userId.constructor === editorId.constructor);
    console.log(comment?.userId.constructor.name, editorId.constructor.name);
    if (!comment) throw new Error();
    if (!comment.isOwnedBy(editorId)) throw new Error();
    if (comment.text.equals(newText)) return; // if not changed dont send Event

    comment.edit(newText);
    this.addEvent(CommentEdited.of(commentId));
  }

  deleteComment(commentId: CommentId, editorId: UserId) {
    const comment = this.comments.find(comment => comment.id.equals(commentId))

    if (!comment) throw new Error();
    if (!comment.isOwnedBy(editorId)) throw new Error();

    this.addEvent(CommentDeleted.of(comment))
  }
}
