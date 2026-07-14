import DomainEvent from '../../../common/Domain/DomainEvent';
import Email from '../ValueObjects/Email';

export default class EmailUserVerify extends DomainEvent {
  constructor(
    public readonly email: string,
  ) {
    super();
  }

  static of(email: Email): EmailUserVerify {
    return new EmailUserVerify(email.getValue);
  }
}
