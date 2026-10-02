import Exception from './Exception';

export default class NotFoundException extends Exception {
  constructor(errorMessage: string) {
    super(errorMessage);
  }
}
