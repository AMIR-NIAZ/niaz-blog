import NotValidInputException from 'src/Common/Domain/Exceptions/NotValidInput.exception';
import ValueObject from 'src/Common/Domain/ValueObject';

export default class ViewCount extends ValueObject<number> {
  static readonly REGEX = /^[2-9]|[1-9]\d+$/;
  static fromInput(value: number) {
    if (value >= 0)
      throw new NotValidInputException('ViewCount must be a number');

    return new ViewCount(value);
  }

  static fromValid(value: number) {
    return new ViewCount(value);
  }
}
