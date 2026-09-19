import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import User from '../../../../Domain/Entities/User';
import UserId from '../../../../Domain/ValueObjects/UserId';
import UserNsme from '../../../../Domain/ValueObjects/UserName';
import Password from '../../../../Domain/ValueObjects/Password';
import Email from '../../../../Domain/ValueObjects/Email';
import { RegisterCommand } from './Register.command';
import { Register } from './Register';
import { UserRepository } from '../../../Ports/User.repsitory';
import AlreadyExistsException from '../../../../../common/Domain/Exceptions/AlreadyExists.exception';
import { HashService } from '../../../../../common/Application/Output/Hash.service';
import { Publisher } from '../../../../../common/Application/Output/Publisher.service';
import NewUserRegistered from 'src/User/Domain/Events/NewUserRegistered.event';
import { CacheService } from 'src/common/Application/Output/Cache.service';
import Otp from 'src/User/Domain/ValueObjects/Otp';
import Role from 'src/User/Domain/ValueObjects/Role';

@CommandHandler(RegisterCommand)
export class RegisterImpl implements Register {
  constructor(
    @Inject(HashService)
    private readonly hashService: HashService,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(Publisher)
    private readonly Publisher: Publisher,
    @Inject(CacheService)
    private readonly cacheService: CacheService,
  ) {}
  async execute(command: RegisterCommand): Promise<void> {
    const userName = UserNsme.fromInput(command.username);
    const password = Password.fromInput(command.password);
    const email = Email.fromInput(command.email);
    const role = Role.user();

    const isUserExiste = await this.userRepository.loadByEmail(email);
    if (isUserExiste && isUserExiste.emailVerified)
      throw new AlreadyExistsException('user already existe');

    const hashPassword = await this.hashService.createHash(password.getValue);

    const user = User.register(
      UserId.create(),
      userName,
      Password.fromValid(hashPassword),
      email,
      role,
    );

    await this.userRepository.register(user);

    const otp = Otp.create();
    await this.cacheService.set(
      `email:${email.getValue}`,
      await this.hashService.createHash(otp.getValue),
      60,
    );

    await this.Publisher.publish(NewUserRegistered.of(user, otp.getValue));
  }
}
