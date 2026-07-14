import DomainEvent from '../../../common/Domain/DomainEvent';
import User from '../User';

export default class NewUserRegistered extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly otp: string,
    public readonly registeredAt: Date,
  ) {
    super();
  }

  static of(user: User, otp: string): NewUserRegistered {
    return new NewUserRegistered(user.id.getValue, user.email.getValue, otp, new Date());
  }
}
