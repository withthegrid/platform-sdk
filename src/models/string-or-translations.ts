import Joi from 'joi';
import { schema as translationsSchema, Translations } from './translations';
import { Locale } from './locale';

const schema = Joi.alternatives(
  Joi.string().example('untranslated string').meta({ className: 'untranslatedString' }),
  translationsSchema,
)
  .tag('stringOrTranslations')
  .meta({ className: 'stringOrTranslations' });

const stringBeforeV7ElseStringOrTranslationSchema = (apiVersion: number): Joi.AnySchema => {
  if (apiVersion <= 6) {
    return Joi.string();
  }
  return schema;
};

type StringOrTranslations = string | Translations;

function getTranslatedString(name: StringOrTranslations | null, locale: Locale): string
function getTranslatedString(name: StringOrTranslations, locale: Locale): string
function getTranslatedString(
  name: StringOrTranslations | null,
  locale: Locale,
): string {
  if (name === null) {
    return '';
  }
  if (typeof name === 'string') {
    return name;
  }
  const localName = name[locale];
  if (localName === undefined) {
    return name.en;
  }
  return localName;
}

export {
  schema,
  StringOrTranslations,
  getTranslatedString,
  stringBeforeV7ElseStringOrTranslationSchema,
};
