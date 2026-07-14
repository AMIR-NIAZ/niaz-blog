import { UserEntity } from '../../Infrastructure/Output/TypeOrm/user.entity';
import User from '../../Domain/User';
import Email from 'src/User/Domain/ValueObjects/Email';

export const UserRepository = Symbol('UserRepository');

export interface UserRepository {
  register(user: User): Promise<User>;
  loadById(id: string): Promise<User | null>;
  loadByEmail(email: Email): Promise<User | null>;
  VerifyEmail(user: User): Promise<void>;
}
