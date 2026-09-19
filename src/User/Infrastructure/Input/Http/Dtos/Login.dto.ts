import { LoginQuery } from 'src/User/Application/UseCases/Queries/Login/Login.query';

export class LoginDto implements LoginQuery {
  email: string;
  password: string;
}
