import ValueObject from 'src/common/Domain/ValueObject';

export default class Content extends ValueObject<string> {
  static fromInput(value: string) {
    if (value.trim().length < 20) throw new Error();

    return new Content(value);
  }

  static fromValid(value: string) {
    return new Content(value)
  }
}
