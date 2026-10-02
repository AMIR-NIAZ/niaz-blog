import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Email from 'src/User/Domain/ValueObjects/Email';
import { UserRepository } from 'src/User/Application/Ports/User.repository';
import User from 'src/User/Domain/Entities/User';
import UserMapper from './Mapper/TypeOrmUser.mapper';
import { TypeOrmUserEntity } from './TypeOrmUser.entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(TypeOrmUserEntity)
    private readonly repository: Repository<TypeOrmUserEntity>,
  ) {}

  async VerifyEmail(user: User) {
    const entity = UserMapper.toPersistence(user);

    await this.repository.update(entity.id, { emailVerified: true });
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
