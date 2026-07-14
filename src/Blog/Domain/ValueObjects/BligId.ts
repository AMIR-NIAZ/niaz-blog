import NotValidInputException from '../../../common/Domain/Exceptions/NotValidInput';
import UUID4 from '../../../common/Domain/UUID4';
import ValueObject from '../../../common/Domain/ValueObject';

export default class BlogId extends ValueObject<string> {
  public static fromInput(uuid: string) {
    const trimUUID = String(uuid).trim();

    if (!UUID4.isValid(trimUUID))
      throw new NotValidInputException('id invalid');
  }

  static create(): BlogId {
    const uuid = UUID4.create();
    return new BlogId(uuid.getValue);
  }

  static fromValid(value: string): BlogId {
    return new BlogId(value);
  }
}
