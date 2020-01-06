import Joi from '@hapi/joi';

import { schema as measurementCycleSchema, MeasurementCycle } from './measurement-cycle';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('j1iha9'),
  mcuId: Joi.string().required().description('The microchip identifier of the sensor').example('390044000351352237353037'),
  environmentHashId: Joi.string().allow(null).required().example('f1a4w1'),
  typeKey: Joi.string().valid(
    'cp-pole',
    'cp-pole-2',
    'cp-pole-coupon',
    'cp-rect',
    'cp-rect-modbus',
    'cp-rect-analog',
    'dh-home',
    'dh-leak-1',
    'dh-leak-2',
    'dh-station',
  ).required().example('cp-pole'),
  properties: Joi.object().required().example({}),
  measurementCycle: measurementCycleSchema,
  lastOnlineAt: Joi.date().allow(null).required().example('2019-12-31T15:23Z'),
  validated: Joi.boolean().required().example(true),
})
  .description('Called a sensor in the GUI')
  .tag('device');


interface Device {
  hashId: string;
  mcuId: string;
  environmentHashId: string | null;
  typeKey: string;
  properties: Record<string, string | number>;
  measurementCycle: MeasurementCycle;
  lastOnlineAt: Date | null;
  validated: boolean;
}

export { schema, Device };
