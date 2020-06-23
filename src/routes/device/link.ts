import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as measurementCycleSchema, MeasurementCycle } from '../../models/measurement-cycle';
import { schema as deviceSchema, Device } from '../../models/device';
import { schema as deviceTypeSchema, DeviceType } from '../../models/device-type';
import { schema as pinSchema, Pin } from '../../models/pin';
import { fieldsToServerUpdateSchema, FieldsToServerUpdate } from '../../models/field-configuration';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    pinGroupHashId: string;
    channelMapping: {
      channel: number;
      pinHashId: string;
      deviceFields?: FieldsToServerUpdate;
    }[];
  };
}

interface Response {
  device: Device;
  deviceType: DeviceType;
  measurementCycle: MeasurementCycle | null;
  pins: Pin[];
}


const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/:hashId/link',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('j1iha9'),
  }).required(),
  body: Joi.object().keys({
    pinGroupHashId: Joi.string().required().example('dao97'),
    channelMapping: Joi.array().items(Joi.object().keys({
      channel: Joi.number().integer().required().example(0),
      pinHashId: Joi.string().required().example('e13d57'),
      deviceFields: fieldsToServerUpdateSchema,
    })).required(),
  }).required(),
  response: Joi.object().keys({
    device: deviceSchema.required(),
    deviceType: deviceTypeSchema.required(),
    measurementCycle: measurementCycleSchema.allow(null).required(),
    pins: Joi.array().items(pinSchema).required().description('All pins of the pinGroup, as some might have an updated deviceFields property'),
  }).required(),
  right: { environment: 'SENSORS' },
  description: 'Connect a device to a pin group (and its channels to the pin group\'s pins. Future measurement reports from this device will also be available on this pin group. A claim token for this device will be invalidated',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
