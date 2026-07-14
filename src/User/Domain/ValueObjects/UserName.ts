import NotValidInputException from '../../../common/Domain/Exceptions/NotValidInput';
import ValueObject from '../../../common/Domain/ValueObject';

export default class UserNsme extends ValueObject<string> {
  static readonly REGEX = /^[a-zA-Z][a-zA-Z0-9_.]{2,19}$/;
  static fromInput(value: string) {
    if (!UserNsme.REGEX.test(value)) {
      throw new NotValidInputException('username invalid');
    }

    return new UserNsme(value);
  }

  static fromValid(value: string) {
    return new UserNsme(value);
  }
}
