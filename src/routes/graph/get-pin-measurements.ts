import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as measurementSchema, Measurement } from '../../models/measurement';
import { schema as quantitySchema, Quantity } from '../../models/quantity';

interface Request {
  params: {
    hashId: string;
  };
  query: {
    from: Date;
    to: Date;
  };
}

interface Response {
  observations: {
    measurement: Measurement;
    quantity: Quantity;
  }[];
  moreMeasurementsAvailable: boolean;
  lowerbound: Date | null;
  upperbound: Date | null;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/pin/:hashId/measurements',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('e13d57'),
  }).required(),
  description: 'Returns up to 310 measurements. If more measurements are available, the most representative ones are selected. This route can be used for plotting. If all measurements should be obtained, the report controllers are better suited.',
  query: Joi.object().keys({
    from: Joi.date().iso().required().example('2019-12-01T00:00Z'),
    to: Joi.date().iso().required().example('2020-01-01T00:00Z'),
  }).required(),
  right: { environment: 'READ' },
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    moreMeasurementsAvailable: Joi.boolean().required().example(false).description('Whether there are more than 310 measurements available'),
    lowerbound: Joi.date().allow(null).required().example('2019-12-01T00:00Z'),
    upperbound: Joi.date().allow(null).required().example('2019-12-01T00:00Z'),
    observations: Joi.array().items(Joi.object().keys({
      measurement: measurementSchema(apiVersion).required(),
      quantity: quantitySchema.required(),
    })).required(),
  }),
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
