import Joi from 'joi';
import { schema as fieldToServerFullSchema, FieldToServerFull } from './field-to-server-full';

type FieldsToServerFull = Record<string, FieldToServerFull>;

const schema = Joi.object().pattern(
  Joi.string(),
  fieldToServerFullSchema,
)
  .tag('fieldsToServerFull')
  .description('How form fields should be sent to the server when creating them.');

export {
  schema,
  FieldsToServerFull,
};
