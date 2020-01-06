import Joi from '@hapi/joi';

const schema = Joi.object().keys({
  name: Joi.object().pattern(
    /.*/,
    Joi.string(),
  ).required().example({
    en: 'Shunt offset',
    nl: 'Shunt offset',
  }),
  // If null, use text field, otherwise, use select field
  valueOptions: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.array().items(Joi.object().keys({
      text: Joi.string().required(),
      value: Joi.string().required(),
    })),
  ).allow(null).default(null),
  prefix: Joi.string(),
  suffix: Joi.string(),
  hint: Joi.object().pattern(
    /.*/,
    Joi.string().allow(''),
  ).required().example({
    en: 'Will be subtracted from voltage DC measurements of the shunt',
    nl: 'Zal worden afgetrokken van gelijkspanning metingen op de shunt',
  }),
})
  .description('Device specific settings. To be deprecated.')
  .tag('property');

interface Property {
  name: {
    [lang: string]: string;
  };
  valueOptions: string[] | { text: string; value: string }[] | null;
  prefix?: string;
  suffix?: string;
  hint: {
    [lang: string]: string;
  };
}

export { schema, Property };
