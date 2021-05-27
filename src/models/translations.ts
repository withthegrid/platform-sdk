import Joi from 'joi';

const schema = Joi.alternatives(
  Joi.string(),
  Joi.object().keys({
    en: Joi.string().required(),
    nl: Joi.string().required(),
  }),
);

interface Translations {
  en: string,
  nl: string,
}

type StringOrTranslations = string | Translations;

export {
  schema,
  Translations,
  StringOrTranslations,
};
