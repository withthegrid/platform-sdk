import BaseError from './base';

class CommsCanceledError extends BaseError {
  constructor() {
    super('comms_canceled', 'You canceled this request');
  }
}

export default CommsCanceledError;
