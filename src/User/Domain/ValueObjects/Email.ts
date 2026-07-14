import NotValidInputException from '../../../common/Domain/Exceptions/NotValidInput';
import ValueObject from '../../../common/Domain/ValueObject';

export default class Email extends ValueObject<string> {
  static readonly REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  static fromInput(value: string) {
    if (!Email.REGEX.test(value))
      throw new NotValidInputException('email invalid');

    return new Email(value);
  }

  static fromValid(value: string) {
    return new Email(value);
  }
}
