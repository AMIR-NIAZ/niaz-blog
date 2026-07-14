import ValueObject from 'src/common/Domain/ValueObject';

export default class Title extends ValueObject<string> {
  static readonly REGEX = /^(?=.*\S)[^<>]{3,150}$/;
  static fromInput(value: string) {
    if (!Title.REGEX.test(value)) throw new Error();

    return new Title(value);
  }

  static fromValid(value: string) {
    return new Title(value);
  }
}
