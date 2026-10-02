// Common/Domain/Exceptions/Forbidden.exception.ts
import Exception from './Exception';

export default class ForbiddenException extends Exception {
  constructor(message = 'You are not allowed to perform this action') {
    super(message);
  }
}
