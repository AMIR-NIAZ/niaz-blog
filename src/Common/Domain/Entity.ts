import ValueObject from './ValueObject';

export default abstract class Entity {
  protected constructor(public readonly id: ValueObject<string>) {}

  public equals(entity?: Entity): boolean {
    if (!entity) {
      return false;
    }

    if (this === entity) {
      return true;
    }

    return this.id.equals(entity.id);
  }
}
