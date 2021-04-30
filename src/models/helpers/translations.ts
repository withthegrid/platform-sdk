import Joi from 'joi';

export const stringOrTranslationsSchema = Joi.alternatives(
  Joi.string(),
  Joi.object().keys({
    en: Joi.string().required(),
    nl: Joi.string().required(),
  }),
);

export interface Translations {
  en: string,
  nl: string,
}
