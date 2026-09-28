import NotValidInputException from '../../../Common/Domain/Exceptions/NotValidInput.exception';
import UUID4 from '../../../Common/Domain/UUID4';
import ValueObject from '../../../Common/Domain/ValueObject';

export default class CommentId extends ValueObject<string> {
  public static fromInput(uuid: string) {
    const trimUUID = String(uuid).trim();

    if (!UUID4.isValid(trimUUID))
      throw new NotValidInputException('id invalid');
  }

  static create(): CommentId {
    const uuid = UUID4.create();
    return new CommentId(uuid.getValue);
  }

  static fromValid(value: string): CommentId {
    return new CommentId(value);
  }
}
