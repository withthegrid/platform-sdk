import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as siNumberSchema, SiNumber } from '../../models/si-number';

interface Request {
  body: {
    pinHashId: string;
    quantityHashId: string;
    thresholds: {
      criticallyLow: SiNumber | null;
      low: SiNumber | null;
      high: SiNumber | null;
      criticallyHigh: SiNumber | null;
    };
  };
}

interface Response {
  hashId: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/thresholds',
  body: Joi.object().keys({
    pinHashId: Joi.string().required().example('e13d57'),
    quantityHashId: Joi.string().required().example('sajia1'),
    thresholds: Joi.object().keys({
      criticallyLow: siNumberSchema.allow(null).required().description('If null, incoming measurements are not checked against this value'),
      low: siNumberSchema.allow(null).required().description('If null, incoming measurements are not checked against this value'),
      high: siNumberSchema.allow(null).required().description('If null, incoming measurements are not checked against this value'),
      criticallyHigh: siNumberSchema.allow(null).required().description('If null, incoming measurements are not checked against this value'),
    }).required(),
  }).required(),
  right: { environment: 'ISSUES' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('tap192'),
  }).required(),
  description: 'Sets issue triggers (thresholds) on a specific quantitity on a specific port (pin). If a measurement outside these limits is registered, an issue is automatically created (if there isn\'t a relevant one open yet)',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
