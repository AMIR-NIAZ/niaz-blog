import ValueObject from '../../../Common/Domain/ValueObject';

export default class UserId extends ValueObject<string> {
  static fromValid(value: string): UserId {
    return new UserId(value);
  }
}
