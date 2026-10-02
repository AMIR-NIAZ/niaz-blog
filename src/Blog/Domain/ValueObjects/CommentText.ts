import NotValidInputException from 'src/Common/Domain/Exceptions/NotValidInput.exception';
import ValueObject from 'src/Common/Domain/ValueObject';

export default class CommentText extends ValueObject<string> {
  static readonly REGEX = /[^<>]{3,150}$/;
  static fromInput(value: string) {
    if (!CommentText.REGEX.test(value))
      throw new NotValidInputException(
        'CommentText must be ust be 3 to 150 characters',
      );

    return new CommentText(value);
  }

  static fromValid(value: string) {
    return new CommentText(value);
  }
}
