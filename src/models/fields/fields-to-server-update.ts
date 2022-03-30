import Joi from 'joi';
import { schema as fileToServerSchema, FileToServer } from '../file-to-server';
import { schema as fieldToServerFullSchema, FieldToServerFull } from './field-to-server-full';
import { schema as fieldsToServerFullSchema, FieldsToServerFull } from './fields-to-server-full';

type FieldToServerPartial = { key: string; value: FieldToServerFull }
  | { key: string; delete?: string[]; add?: FileToServer[] }
type FieldsToServerPartial = FieldToServerPartial[];

type FieldsToServerUpdate = FieldsToServerFull | FieldsToServerPartial;

const fieldToServerPartialSchema = Joi.alternatives().try(
  Joi.object().keys({
    key: Joi.string().required(),
    value: fieldToServerFullSchema,
  }),
  Joi.object().keys({
    key: Joi.string().required(),
    delete: Joi.array().items(Joi.string().required()),
    add: Joi.array().items(fileToServerSchema.required()),
  }),
);

const fieldsToServerPartialSchema = Joi.array().items(
  fieldToServerPartialSchema,
);

const schema = Joi.alternatives().try(
  fieldsToServerFullSchema.required(),
  fieldsToServerPartialSchema.required(),
)
  .tag('fieldsToServerUpdate')
  .meta({ className: 'fieldsToServerUpdate' })
  .description('How form fields should be sent to the server when updating them.');

export {
  schema,
  FieldsToServerUpdate,
};
