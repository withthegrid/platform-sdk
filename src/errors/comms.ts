import BaseError from './base';

class CommsError extends BaseError {
  constructor(message: string) {
    super('comms', message);
  }
}

export default CommsError;
