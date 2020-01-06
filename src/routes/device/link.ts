import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as measurementCycleSchema, MeasurementCycle } from '../../models/measurement-cycle';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    pinGroupHashId: string;
    channelMapping: {
      channel: number;
      pinHashId: string;
    }[];
  };
}

interface Response {
  deviceTypeKey: string | null;
  measurementCycle: MeasurementCycle | null;
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
    })).required(),
  }).required(),
  response: Joi.object().keys({
    deviceTypeKey: Joi.string().required().allow(null).example('cp-pole'),
    measurementCycle: measurementCycleSchema.allow(null).required(),
  }).required(),
  right: 'SENSORS',
  description: 'Connect a device to a pin group (and its channels to the pin group\'s pins. Future measurement reports from this device will also be available on this pin group.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
