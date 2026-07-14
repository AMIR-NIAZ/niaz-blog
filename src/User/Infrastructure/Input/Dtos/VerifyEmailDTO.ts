import { VerifyEmailCommand } from 'src/User/Application/UseCase/Commands/verifyEmail/verifyEmailCommond';

export class VerifyEmailDTO implements VerifyEmailCommand {
  email: string;
  otp: string;
}
