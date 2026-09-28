import NotValidInputException from '../../../Common/Domain/Exceptions/NotValidInput.exception';
import ValueObject from '../../../Common/Domain/ValueObject';

export default class Password extends ValueObject<string> {
  static readonly REGEX = /^[a-zA-Z0-9_.]{3,20}$/;

  static fromInput(value: string) {
    if (!Password.REGEX.test(value))
      throw new NotValidInputException('password invalid');

    return new Password(value);
  }

  static fromValid(value: string) {
    return new Password(value);
  }
}
