import Joi from 'joi';
import { schema as fieldsFromServerSchema, FieldsFromServer } from './fields/fields-from-server';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('e13d57'),
  pinGroupHashId: Joi.string().required().example('dao97'),
  name: Joi.string().required().example('My connecting point'),
  fields: fieldsFromServerSchema.required().example({ id: 'My connecting point' })
    .description('The list of keys for an environment can be obtained by requesting the environment model (returned at login)'),
  deviceFields: fieldsFromServerSchema.required().example({}),
  level: Joi.number().integer().valid(0, 1, 2).required()
    .description('0: no serious or critical open issues, 1: one or more serious open issues an no critical open issues, 2: one or more critical open issues')
    .example(0),
  typeKey: Joi.string().allow(null).default(null),
  deletedAt: Joi.date().allow(null).required().example('2019-12-31T15:23Z'),
})
  .description('A connecting point. Always part of a pin group. All measurements are recorded at pin level. When a device is connected to a pin group, its channels are to be connected to the pins of the pin group.')
  .tag('pin');

interface Pin {
  hashId: string;
  pinGroupHashId: string;
  name: string;
  fields: FieldsFromServer;
  deviceFields: FieldsFromServer;
  level: 0 | 1 | 2;
  typeKey: string | null;
  deletedAt: Date | null;
}

export { schema, Pin };
