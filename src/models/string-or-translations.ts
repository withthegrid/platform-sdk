import Joi from 'joi';
import { schema as translationsSchema, Translations } from './translations';
import { Locale } from './locale';

const schema = Joi.alternatives(
  Joi.string().example('untranslated string').meta({ className: 'untranslatedString' }),
  translationsSchema,
)
  .tag('stringOrTranslations')
  .meta({ className: 'stringOrTranslations' });

type StringOrTranslations = string | Translations;

function getTranslatedString(name: null, locale: Locale): string
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
};
