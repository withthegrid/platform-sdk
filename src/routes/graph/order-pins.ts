import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as pinSchema, Pin } from '../../models/pin';

interface Request {
  body: {
    pinHashIds?: string[]
    sortType: 'pinGroupSort' | 'edgeSort';
  };
}

interface Response {
  pins: Pin[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/pin/order',
  body: Joi.object().keys({
    pinHashIds: Joi.array().items(Joi.string()).description('Determines the set (and the order) of the pins in the pin groups'),
    sortType: Joi.string().valid('pinGroupSort', 'edgeSort').required(),
  }).required(),
  response: Joi.object().keys({
    pins: Joi.array().items(pinSchema).required(),
  }).required(),
  right: { environment: 'STATIC' },
  description: 'Update the order of pins',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
