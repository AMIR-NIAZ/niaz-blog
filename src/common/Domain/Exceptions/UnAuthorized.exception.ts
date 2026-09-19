import Exception from './Exception';

export class UnauthorizedException extends Exception {
  constructor() {
    super('UnauthorizedException');
  }
}
