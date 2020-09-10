import Joi from 'joi';

import { schema as measurementCycleSchema, MeasurementCycle } from './measurement-cycle';
import { schema as fieldsFromServerSchema, FieldsFromServer } from './fields/fields-from-server';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('j1iha9'),
  supplierHashId: Joi.string().required().example('f1a4w1'),
  supplierDeviceIdentifier: Joi.string().required().example('390044000351352237353037').description('Should be unique within the connectivity environment'),
  deviceTypeHashId: Joi.string().required().example('wasd2'),
  fields: fieldsFromServerSchema.required().example({}),
  measurementCycle: measurementCycleSchema.allow(null).required(),
  lastOnlineAt: Joi.date().allow(null).required().example('2019-12-31T15:23Z'),
  validated: Joi.boolean().required().example(true),
})
  .description('A single device, that can be installed at a location and report measurements from one or more ports at that location')
  .tag('device');

interface Device {
  hashId: string;
  supplierHashId: string;
  supplierDeviceIdentifier: string;
  deviceTypeHashId: string;
  fields: FieldsFromServer;
  measurementCycle: MeasurementCycle | null;
  lastOnlineAt: Date | null;
  validated: boolean;
}

export { schema, Device };
