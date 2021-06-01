import Joi from 'joi';

const schema = Joi.object().keys({
  en: Joi.string().required(),
  nl: Joi.string().required(),
});

interface Translations {
  en: string,
  nl: string,
}

export {
  schema,
  Translations,
};
