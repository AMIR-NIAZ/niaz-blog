import ValueObject from '../../common/Domain/ValueObject';
import AggregateRoot from '../../common/Domain/AggregateRoot';
import UserNsme from './ValueObjects/UserName';
import Password from './ValueObjects/Password';
import Email from './ValueObjects/Email';
import UserId from './ValueObjects/UserId';
import EmailUserVerify from './Events/EmailUserVerify';
import Role from './ValueObjects/Role';

export default class User extends AggregateRoot {
  constructor(
    public id: ValueObject<string>,
    public username: UserNsme,
    public password: Password,
    public email: Email,
    public role: Role,
    public emailVerified: boolean = false,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {
    super(id);
  }

  static register(
    id: UserId,
    username: UserNsme,
    password: Password,
    email: Email,
    role: Role,
  ): User {
    const user = new User(id, username, password, email, role);

    return user;
  }

  public confirmEmail() {
    this.emailVerified = true;

    this.addEvent(EmailUserVerify.of(this.email));
  }

  public rename(username: UserNsme) {
    this.username = username;
  }
}
