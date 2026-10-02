import Exception from './Exception';

export default class UnauthorizedException extends Exception {
  constructor(public message = 'UnauthorizedException') {
    super(message);
  }
}
