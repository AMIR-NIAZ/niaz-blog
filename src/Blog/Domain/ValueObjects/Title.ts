import NotValidInputException from 'src/Common/Domain/Exceptions/NotValidInput.exception';
import ValueObject from 'src/Common/Domain/ValueObject';

export default class Title extends ValueObject<string> {
  static readonly REGEX = /^(?=.*\S)[^<>]{3,150}$/;
  static fromInput(value: string) {
    if (!Title.REGEX.test(value))
      throw new NotValidInputException(
        'Title must be 3 to 150 characters and contain only letters, numbers, and spaces',
      );

    return new Title(value);
  }

  static fromValid(value: string) {
    return new Title(value);
  }
}
