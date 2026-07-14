import NotValidInputException from '../../../common/Domain/Exceptions/NotValidInput';
import ValueObject from '../../../common/Domain/ValueObject';

export enum UserRoleEnum {
  USER = 'user',
  MANAGER = 'manager',
}

export default class Role extends ValueObject<string> {
  static fromInput(value: string): Role {
    if (!Object.values(UserRoleEnum).includes(value as UserRoleEnum)) {
      throw new NotValidInputException('invalid role');
    }

    return new Role(value);
  }

  static fromValue(value: string): Role {
    return new Role(value);
  }

  static user(): Role {
    return new Role(UserRoleEnum.USER);
  }

  static manager(): Role {
    return new Role(UserRoleEnum.MANAGER);
  }

  isUser(): boolean {
    return this.getValue === UserRoleEnum.USER;
  }

  isManager(): boolean {
    return this.getValue === UserRoleEnum.MANAGER;
  }
}
