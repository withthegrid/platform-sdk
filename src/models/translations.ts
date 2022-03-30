import Joi from 'joi';

const schema = Joi.object().keys({
  en: Joi.string().allow('').example('English string').required(),
  nl: Joi.string().allow('').example('Nederlandse string').required(),
})
  .tag('translations')
  .meta({ className: 'translations' });

interface Translations {
  en: string,
  nl: string,
}

export {
  schema,
  Translations,
};
