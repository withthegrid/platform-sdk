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
  // [min, max, schema]
  // range being [x;y)
  const ranges: [number, number, Joi.AnySchema][] = [
    [9, 9999, schema(255)],
    [8, 9, schema()],
    [0, 7, Joi.string()],
  ];
  for (let i = 0, len = ranges.length; i < len; i += 1) {
    const [min, max, appliedSchema] = ranges[i];
    if (apiVersion >= min && apiVersion < max) {
      return appliedSchema;
    }
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
