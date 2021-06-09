import Joi from 'joi';
import { Translations } from './translations';

const schema = Joi.string().valid('en', 'nl');

type Locale = keyof Translations;

export {
  schema,
  Locale,
};
