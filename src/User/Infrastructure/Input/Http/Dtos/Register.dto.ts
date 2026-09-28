import { IsString } from 'class-validator';
import { RegisterCommand } from 'src/User/Application/UseCases/Commands/Register/Register.command';

export class RegisterDto implements RegisterCommand {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  email: string;
}
