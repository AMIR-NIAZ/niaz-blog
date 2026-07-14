import { LoginQuery } from 'src/User/Application/UseCase/Queries/Login/LoginQuery';
import { RegisterCommand } from '../../../Application/UseCase/Commands/register/RegisterCommand';

export class LoginDTO implements LoginQuery {
  email: string;
  password: string;
}
