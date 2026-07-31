import ValueObject from 'src/common/Domain/ValueObject';

export default class ViewCount extends ValueObject<number> {
  static readonly REGEX = /^[2-9]|[1-9]\d+$/;
  static fromInput(value: number) {
    if (value >= 0) throw new Error();

    return new ViewCount(value);
  }

  static fromValid(value: number) {
    return new ViewCount(value);
  }
}
