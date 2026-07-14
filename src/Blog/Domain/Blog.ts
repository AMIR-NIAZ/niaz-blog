import AggregateRoot from 'src/common/Domain/AggregateRoot';
import Title from './ValueObjects/Title';
import Content from './ValueObjects/Content';
import UserId from './ValueObjects/UserId';
import BlogId from './ValueObjects/BligId';
import Comment from './Comment';
import CreateNewBlog from './Events/CreateNewBlog';
import DeleteBlog from './Events/DeleteBlog';
import CommentText from './ValueObjects/CommentText';
import AddComment from './Events/AddComment';

export default class Blog extends AggregateRoot {
  constructor(
    public id: BlogId,
    public title: Title,
    public content: Content,
    public userId: UserId,
    public comments: Comment[] = [],
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {
    super(id);
  }
  
  static create(title: Title, content: Content, userId: UserId) {
    const id = BlogId.create()
    const blog = new Blog(id, title, content, userId);

    blog.addEvent(CreateNewBlog.of(id, userId))

    return blog;
  }

  update(title: Title, content: Content) {
    this.title = title;
    this.content = content;

    this.addEvent(DeleteBlog.of(this))
  }

  delete() {
    this.addEvent(DeleteBlog.of(this))
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
