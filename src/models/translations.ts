import Joi from 'joi';

const translationsSchema = Joi.object().keys({
  en: Joi.string().required(),
  nl: Joi.string().required(),
});
const schema = Joi.alternatives(
  Joi.string(),
  translationsSchema,
);

interface Translations {
  en: string,
  nl: string,
}

type StringOrTranslations = string | Translations;

export {
  schema,
  translationsSchema,
  Translations,
  StringOrTranslations,
};
