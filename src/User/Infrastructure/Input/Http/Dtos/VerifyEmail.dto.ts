import { VerifyEmailCommand } from 'src/User/Application/UseCases/Commands/VerifyEmail/VerifyEmail.commond';

export class VerifyEmailDto implements VerifyEmailCommand {
  email: string;
  otp: string;
}
