import User from '../../../../../Domain/Entities/User';
import UserId from '../../../../../Domain/ValueObjects/UserId';
import Password from '../../../../../Domain/ValueObjects/Password';
import Email from '../../../../../Domain/ValueObjects/Email';
import UserNsme from '../../../../../Domain/ValueObjects/UserName';
import Role from 'src/User/Domain/ValueObjects/Role';
import { TypeOrmUserEntity } from '../TypeOrmUser.entity';
import UserResponse from 'src/User/Application/Ports/Responses/user.response';

export default class UserMapper {
  static toDomain(model: TypeOrmUserEntity): User {
    const user: User = new User(
      UserId.fromValid(model.id),
      UserNsme.fromValid(model.username),
      Password.fromValid(model.password),
      Email.fromValid(model.email),
      Role.fromValue(model.role),
      model.emailVerified,
      model.createdAt,
      model.updatedAt,
    );

    return user;
  }

  static toPersistence(user: User): TypeOrmUserEntity {
    const model: TypeOrmUserEntity = {
      id: user.id.getValue,
      username: user.username.getValue,
      password: user.password.getValue,
      email: user.email.getValue,
      role: user.role.getValue,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return model;
  }

  static toResponse(user: TypeOrmUserEntity): UserResponse {
    return new UserResponse(
      user.id,
      user.username,
      user.email,
      user.emailVerified,
      user.role,
      user.createdAt,
      user.updatedAt,
    );
  }
}
