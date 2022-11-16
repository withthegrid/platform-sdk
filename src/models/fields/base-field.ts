import Joi from 'joi';

type BaseField = boolean | number | string | null | undefined;

// strict(): do not do casting here, otherwise for example a string might end up as a number
const baseFieldTypes: Joi.SchemaLikeWithoutArray[] = [
  Joi.boolean().example(true).strict().required(),
  Joi.number().strict().required(),
  Joi.string().strict().allow('').required(),
  Joi.any().valid(null).required()];

const schema = Joi.alternatives().try(
  ...baseFieldTypes,
  Joi.object().keys({
    value: Joi.alternatives().try(...baseFieldTypes).required(),
    displayValue: Joi.string(),
  }),
)
  .tag('baseField')
  .description('The values that can be stored in a form field');

export {
  BaseField,
  schema,
};
