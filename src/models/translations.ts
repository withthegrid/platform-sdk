import Joi from 'joi';

const schema = Joi.object().keys({
  en: Joi.string().allow('').required(),
  nl: Joi.string().allow('').required(),
});

interface Translations {
  en: string,
  nl: string,
}

export {
  schema,
  Translations,
};
