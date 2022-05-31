import Joi from 'joi';

const translationStringSchema = Joi.string().allow('').required();
const translationSchema = (example: string) => Joi.alternatives([
  Joi.object({
    plural: translationStringSchema,
    singular: translationStringSchema,
  }),
  translationStringSchema.example(example),
]);
const schema = Joi.object().keys({
  en: translationSchema('English string'),
  nl: translationSchema('Nederlandse string'),
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

type Translations = { 'en': SimpleTranslation, 'nl'?: SimpleTranslation };

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
