import BaseError from './base';

class OutdatedClientError extends BaseError {
  constructor() {
    super('outdated_client', 'This API client is outdated, update it to get access again');
  }
}

export default OutdatedClientError;
