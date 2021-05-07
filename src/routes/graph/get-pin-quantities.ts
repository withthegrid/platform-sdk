import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as quantitySchema, Quantity } from '../../models/quantity';
import { schema as thresholdSchema, Threshold } from '../../models/threshold';

interface Request {
  params: {
    pinHashId: string;
  };
}

interface ResponseRow {
  quantity: Quantity;
  pinThreshold: Threshold | null;
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/pin-quantities/:pinHashId',
  params: Joi.object().keys({
    pinHashId: Joi.string().required().example('e13d57'),
  }).required(),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      quantity: quantitySchema.required(),
      pinThreshold: thresholdSchema.allow(null).required(),
    })).required(),
  }).required(),
  description: 'Get a specific pin quantities by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
