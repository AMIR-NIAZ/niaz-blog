import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserRepository } from '../../../Application/Output/UserRepsitory';
import User from '../../../Domain/User';
import UserMapper from '../Mapper/UserMapper';
import Email from 'src/User/Domain/ValueObjects/Email';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) { }

  async VerifyEmail(user: User) {
    const entity = UserMapper.toPersistence(user);

    await this.repository.update(entity.id, { emailVerified: true })
  }

  async register(user: User): Promise<User> {
    const userResult = UserMapper.toPersistence(user);

    const { id, username, password, email, role, emailVerified } = userResult;

    const userDocument = this.repository.create({
      id,
      username,
      password,
      email,
      role,
      emailVerified,
    });
    await this.repository.save(userDocument);

    return UserMapper.toDomain(userDocument);
  }

  async loadById(id: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async loadByEmail(email: Email): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { email: email.getValue },
    });

    return user ? UserMapper.toDomain(user) : null;
  }
}
