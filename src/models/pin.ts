import Joi from 'joi';
import { schema as fieldsFromServerSchema, FieldsFromServer } from './fields/fields-from-server';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('e13d57'),
  pinGroupHashId: Joi.string().required().example('dao97'),
  name: Joi.string().required().example('My port'),
  fields: fieldsFromServerSchema.required().example({ id: 'My port' })
    .description('The field configuration is stored in the fieldConfigurations key of the monitoring environment object'),
  deviceFields: fieldsFromServerSchema.required().example({})
    .description('The field configuration is stored in the pinFieldConfigurations key of the channel key in the device type object'),
  level: Joi.number().integer().valid(0, 1, 2).required()
    .description('0: no serious or critical open issues, 1: one or more serious open issues an no critical open issues, 2: one or more critical open issues')
    .example(0),
  edgeHashId: Joi.string().allow(null).default(null),
  nodeHashId: Joi.string().allow(null).default(null),
  typeKey: Joi.string().allow(null).default(null),
  deletedAt: Joi.date().allow(null).required().example('2019-12-31T15:23Z'),
})
  .description('A port. Always part of a pin group. All measurements are recorded at pin level. When a device is connected to a pin group, its channels are to be connected to the pins of the pin group.')
  .tag('pin')
  .meta({ className: 'pin' });

interface Pin {
  hashId: string;
  pinGroupHashId: string;
  name: string;
  fields: FieldsFromServer;
  deviceFields: FieldsFromServer;
  level: 0 | 1 | 2;
  typeKey: string | null;
  edgeHashId: string | null;
  nodeHashId: string | null;
  deletedAt: Date | null;
}

export { schema, Pin };
