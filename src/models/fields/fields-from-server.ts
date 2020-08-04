import Joi from '@hapi/joi';
import { schema as baseFieldSchema, BaseField } from './base-field';
import { schema as fileFromServerSchema, FileFromServer } from '../file-from-server';

type FieldFromServer = BaseField | FileFromServer[];
type FieldsFromServer = Record<string, FieldFromServer>;

// strict(): do not do casting here, otherwise for example a string might end up as a number
const fieldFromServerSchema = Joi.alternatives().try(
  baseFieldSchema,
  fileFromServerSchema.required(),
  Joi.array().items(fileFromServerSchema).required(),
);

const schema = Joi.object().pattern(
  Joi.string().required(),
  fieldFromServerSchema,
)
  .tag('fieldsFromServer')
  .description('How form fields are returned by the server.');

export {
  schema,
  FieldsFromServer,
};
