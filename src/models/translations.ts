import Joi from 'joi';

const translationStringSchema = Joi.string().allow('').required();
const translationSchema = (example: string, limit = 9999) => Joi.alternatives().try(
  Joi.object({
    plural: translationStringSchema.max(limit),
    singular: translationStringSchema.max(limit),
  }),
  translationStringSchema.example(example).max(limit),
);
const schema = (limit = 9999): Joi.AnySchema => Joi.object().keys({
  en: translationSchema('English string', limit),
  nl: translationSchema('Nederlandse string', limit),
})
  .tag('translations')
  .meta({ className: 'translations' });

type SimpleTranslation = string
type PluralizedTranslation = Record<'plural' | 'singular', string>
type Translation = SimpleTranslation | PluralizedTranslation

const isSimpleTranslation = (tr: Translation): tr is SimpleTranslation => typeof tr === 'string';

const isPluralizedTranslation = (tr: Translation): tr is PluralizedTranslation => typeof tr === 'object'
  && 'plural' in tr
  && 'singular' in tr
  && typeof tr.plural === 'string'
  && typeof tr.singular === 'string';

const localesKeys = ['en', 'nl'] as const;

type LocaleKey = typeof localesKeys[number];
type Translations = { [P in LocaleKey]?: SimpleTranslation; } & { en: SimpleTranslation };

export {
  schema,
  localesKeys,
  Translations,
  Translation,
  SimpleTranslation,
  PluralizedTranslation,
  isSimpleTranslation,
  isPluralizedTranslation,
};
