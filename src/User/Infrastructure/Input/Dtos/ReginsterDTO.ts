import { RegisterCommand } from '../../../Application/UseCase/Commands/register/RegisterCommand';

export class RegisterDTO implements RegisterCommand {
  username: string;
  password: string;
  email: string;
}
