import Joi from 'joi';
import { schema as translationsSchema, Translations } from './translations';

const schema = Joi.alternatives(
  Joi.string().example('untranslated string'),
  translationsSchema,
).tag('stringOrTranslations');

type StringOrTranslations = string | Translations;

export {
  schema,
  StringOrTranslations,
};
