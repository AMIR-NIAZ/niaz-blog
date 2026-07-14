export default abstract class ValueObject<T> {
  protected readonly value: Readonly<T>;

  protected constructor(value: T) {
    this.value = Object.freeze(value);
  }

  get getValue(): Readonly<T> {
    return this.value;
  }

  public equals(other?: ValueObject<T>): boolean {
    if (!other) {
      return false;
    }

    if (this.constructor !== other.constructor) {
      return false;
    }

    return JSON.stringify(this.value) === JSON.stringify(other.value);
  }
}
