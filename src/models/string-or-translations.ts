import Joi from 'joi';
import { schema as translationsSchema, Translations } from './translations';

const schema = Joi.alternatives(
  Joi.string(),
  translationsSchema,
);

type StringOrTranslations = string | Translations;

export {
  schema,
  StringOrTranslations,
};
