import Joi from '@hapi/joi';
import { schema as baseFieldSchema, BaseField } from './base-field';

type BaseFields = Record<string, BaseField>;

const schema = Joi.object().pattern(
  Joi.string().required(),
  baseFieldSchema,
)
  .tag('baseFields');

export {
  BaseFields,
  schema,
};
