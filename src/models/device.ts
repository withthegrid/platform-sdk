import Joi from '@hapi/joi';

import { schema as measurementCycleSchema, MeasurementCycle } from './measurement-cycle';
import { fieldsSchema, Fields } from './field-configuration';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('j1iha9'),
  supplierHashId: Joi.string().required().example('f1a4w1'),
  supplierDeviceIdentifier: Joi.string().required().example('390044000351352237353037').description('Should be unique within the supplier'),
  deviceTypeHashId: Joi.string().required().example('wasd2'),
  fields: fieldsSchema.required().example({}),
  measurementCycle: measurementCycleSchema,
  lastOnlineAt: Joi.date().allow(null).required().example('2019-12-31T15:23Z'),
  validated: Joi.boolean().required().example(true),
})
  .description('Called a sensor in the GUI')
  .tag('device');


interface Device {
  hashId: string;
  supplierHashId: string;
  supplierDeviceIdentifier: string;
  deviceTypeHashId: string;
  fields: Fields;
  measurementCycle: MeasurementCycle;
  lastOnlineAt: Date | null;
  validated: boolean;
}

export { schema, Device };
