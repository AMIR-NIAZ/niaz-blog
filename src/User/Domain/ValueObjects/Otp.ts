import ValueObject from '../../../common/Domain/ValueObject';

export default class Otp extends ValueObject<string> {
  private static readonly REGEX = /^\d{5}$/;

  static create(): Otp {
    const value = '00000'; //Math.floor(10000 + Math.random() * 90000).toString();

    return new Otp(value);
  }

  static fromInput(value: string): Otp {
    if (!Otp.REGEX.test(value)) {
      throw new Error('invalid otp');
    }

    return new Otp(value);
  }

  static fromValue(value: string): Otp {
    return new Otp(value);
  }
}
