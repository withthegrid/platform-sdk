import Joi from 'joi';
import { schema as baseFieldSchema, BaseField } from './base-field';
import { schema as fileToServerSchema, FileToServer } from '../file-to-server';

type FieldToServerFull = BaseField | FileToServer[];

// strict(): do not do casting here, otherwise for example a string might end up as a number
const schema = Joi.alternatives().try(
  baseFieldSchema,
  Joi.array().items(fileToServerSchema).required(),
)
  .tag('fieldToServerFull')
  .description('The values and files that can be stored in a form field.');

export {
  schema,
  FieldToServerFull,
};
