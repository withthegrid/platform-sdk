import BaseError from './base';

class NoSecondaryConnectionError extends BaseError {
  constructor() {
    super('no_secondary_connection_error', 'Could not obtain a secondary database connection');
  }
}

export default NoSecondaryConnectionError;
