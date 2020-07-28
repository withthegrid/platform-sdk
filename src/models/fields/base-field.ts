import Joi from '@hapi/joi';

type BaseField = boolean | number | string | null | undefined;

// strict(): do not do casting here, otherwise for example a string might end up as a number
const schema = Joi.alternatives().try(
  Joi.boolean().example(true).strict().required(),
  Joi.number().strict().required(),
  Joi.string().strict().allow('').required(),
  Joi.any().valid(null).required(),
)
  .tag('baseField')
  .description('The values that can be stored in a form field');

export {
  BaseField,
  schema,
};
