import crypto from 'crypto';
import ValueObject from './ValueObject';

export default class UUID4 extends ValueObject<string> {
  static readonly REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  constructor(value: string) {
    if (!UUID4.isValid(value)) {
      throw new Error('Invalid UUID v4');
    }

    super(value);
  }

  public static create(): UUID4 {
    return new UUID4(crypto.randomUUID());
  }

  public static isValid(value: string): boolean {
    return UUID4.REGEX.test(value);
  }
}
