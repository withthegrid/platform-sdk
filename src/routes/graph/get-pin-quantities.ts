import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as quantitySchema, Quantity } from '../../models/quantity';
import { schema as measurementThresholdSchema, MeasurementThreshold } from '../../models/measurement-threshold';

interface Request {
  params: {
    pinHashId: string;
  };
}

interface ResponseRow {
  quantity: Quantity;
  pinThreshold: MeasurementThreshold | null;
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
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      quantity: quantitySchema(apiVersion).required(),
      pinThreshold: measurementThresholdSchema.allow(null).required(),
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
