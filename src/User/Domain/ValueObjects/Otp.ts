import NotValidInputException from 'src/Common/Domain/Exceptions/NotValidInput.exception';
import ValueObject from '../../../Common/Domain/ValueObject';

export default class Otp extends ValueObject<string> {
  private static readonly REGEX = /^\d{5}$/;

  static create(): Otp {
    const value = '00000'; //Math.floor(10000 + Math.random() * 90000).toString();

    return new Otp(value);
  }

  static fromInput(value: string): Otp {
    if (!Otp.REGEX.test(value)) {
      throw new NotValidInputException('otp must be length is 5');
    }

    return new Otp(value);
  }

  static fromValue(value: string): Otp {
    return new Otp(value);
  }
}
