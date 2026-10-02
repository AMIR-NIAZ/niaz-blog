import NotValidInputException from '../../../Common/Domain/Exceptions/NotValidInput.exception';
import UUID4 from '../../../Common/Domain/UUID4';
import ValueObject from '../../../Common/Domain/ValueObject';

export default class UserId extends ValueObject<string> {
  public static fromInput(value: string) {
    const trimUUID = String(value).trim();

    if (!UUID4.isValid(trimUUID))
      throw new NotValidInputException('id invalid');

    return new UserId(value);
  }

  static create(): UserId {
    const uuid = UUID4.create();
    return new UserId(uuid.getValue);
  }

  static fromValid(value: string): UserId {
    return new UserId(value);
  }
}
