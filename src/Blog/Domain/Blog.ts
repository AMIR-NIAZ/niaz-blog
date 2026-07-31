import AggregateRoot from 'src/common/Domain/AggregateRoot';
import Title from './ValueObjects/Title';
import Content from './ValueObjects/Content';
import UserId from './ValueObjects/UserId';
import BlogId from './ValueObjects/BlogId';
import Comment from './Comment';
import CreateNewBlog from './Events/CreateNewBlog';
import DeleteBlog from './Events/DeleteBlog';
import CommentText from './ValueObjects/CommentText';
import AddComment from './Events/AddComment';
import UpdateBlog from './Events/UpdateBlog';
import ViewCount from './ValueObjects/ViewCount';

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
    const id = BlogId.create()
    const viewCount = ViewCount.fromValid(0)
    const blog = new Blog(id, title, content, userId, viewCount);

    blog.addEvent(CreateNewBlog.of(id, userId))

    return blog;
  }

  update(title: Title, content: Content) {
    this.title = title;
    this.content = content;

    this.addEvent(UpdateBlog.of(this))
  }

  delete() {
    this.addEvent(DeleteBlog.of(this))
  }

  incrementView() {
    this.viewCount = ViewCount.fromValid(
      this.viewCount.getValue + 1,
    );

    this.addEvent(UpdateBlog.of(this))
  }

  // aggregate methods
  addComment(text: CommentText, senderId: UserId) {
    const comment = Comment.create(text, senderId)
    this.comments.push(comment)

    this.addEvent(AddComment.of(comment))
  }

  // updateComment(text: CommentText) {
  // const comment = Comment.create(text)
  // this.comments.push(comment)

  // this.addEvent(AddComment.of(comment))
  // }
}
