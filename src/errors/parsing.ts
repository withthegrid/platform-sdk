import Joi from 'joi';

import BaseError from './base';

class ParsingError extends BaseError {
  readonly details: Joi.ValidationErrorItem[];

  constructor(joiValidationError: Joi.ValidationError, readonly parameter: string) {
    super('parsing', joiValidationError.message);
    this.details = joiValidationError.details;
  }
}

export default ParsingError;
