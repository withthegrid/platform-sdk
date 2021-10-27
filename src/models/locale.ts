import Joi from 'joi';
import { Translations } from './translations';

const schema = Joi.string().valid('en', 'nl')
  .example('en')
  .description('Locale code');

type Locale = keyof Translations;

export {
  schema,
  Locale,
};
