import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as pinSchema, Pin } from '../../models/pin';
import { schema as edgeSchema, Edge } from '../../models/edge';
import { schema as thresholdSchema, Threshold } from '../../models/threshold';
import { schema as quantitySchema, Quantity } from '../../models/quantity';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  pin: Pin;
  edges: Edge[];
  thresholds: {
    value: Threshold;
    quantity: Quantity;
  }[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/pin/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('e13d57'),
  }).required(),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    pin: pinSchema.required(),
    edges: Joi.array().items(edgeSchema).required(),
    thresholds: Joi.array().items(Joi.object().keys({
      value: thresholdSchema.required(),
      quantity: quantitySchema.required(),
    })).required(),
  }).required(),
  description: 'Get a specific pin identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
