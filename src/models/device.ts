import Joi from 'joi';

import { schema as fieldsFromServerSchema, FieldsFromServer } from './fields/fields-from-server';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('j1iha9'),
  supplierHashId: Joi.string().required().example('f1a4w1'),
  supplierDeviceIdentifier: Joi.string().required().example('390044000351352237353037').description('Should be unique within the connectivity environment'),
  deviceTypeHashId: Joi.string().required().example('wasd2'),
  fields: fieldsFromServerSchema.required().example({}),
  measurementCycle: Joi.valid(null).default(null), // for legacy purposes only
  nextReportBefore: Joi.date().allow(null).required().example('2019-12-31T15:25Z'),
  lastOnlineAt: Joi.date().allow(null).required().example('2019-12-31T15:23Z'),
  validated: Joi.boolean().required().example(true),
  userFacingIdentifier: Joi.string().allow(null).default(null).example('Field value')
    .description('A value of field, specified as identifierFieldKey'),
})
  .description('A single device, that can be installed at a location and report measurements from one or more ports at that location')
  .tag('device')
  .meta({ className: 'device' });

interface Device {
  hashId: string;
  supplierHashId: string;
  supplierDeviceIdentifier: string;
  deviceTypeHashId: string;
  fields: FieldsFromServer;
  nextReportBefore: Date | null;
  lastOnlineAt: Date | null;
  validated: boolean;
  userFacingIdentifier: string | null;
}

export { schema, Device };
