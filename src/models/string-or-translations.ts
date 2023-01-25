import Joi from 'joi';
import { schema as translationsSchema, Translations } from './translations';
import { Locale } from './locale';

const schema = (limit?: number): Joi.AnySchema => {
  if (limit !== undefined) {
    return Joi.alternatives().try(
      Joi.string().example('untranslated string').meta({ className: 'untranslatedString' }).max(limit),
      translationsSchema(limit),
    )
      .tag('stringOrTranslations')
      .meta({ className: 'stringOrTranslations' });
  }

  return Joi.alternatives().try(
    Joi.string().example('untranslated string').meta({ className: 'untranslatedString' }),
    translationsSchema(),
  )
    .tag('stringOrTranslations')
    .meta({ className: 'stringOrTranslations' });
};

const versionedStringOrStringOrTranslationSchema = (apiVersion: number): Joi.AnySchema => {
  if (apiVersion <= 6) {
    return Joi.string();
  }
  return schema(255);
};

type StringOrTranslations = string | Translations;

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
  versionedStringOrStringOrTranslationSchema,
};
