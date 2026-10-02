import NotValidInputException from 'src/Common/Domain/Exceptions/NotValidInput.exception';
import ValueObject from 'src/Common/Domain/ValueObject';

export default class Content extends ValueObject<string> {
  static fromInput(value: string) {
    if (value.trim().length < 20)
      throw new NotValidInputException('content of blog not valid');

    return new Content(value);
  }

  static fromValid(value: string) {
    return new Content(value);
  }
}
