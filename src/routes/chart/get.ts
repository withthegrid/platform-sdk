import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as measurementSchema, Measurement } from '../../models/measurement';

interface Request {
  query: {
    startAt: Date;
    endAt: Date;
    series: {
      quantityHashId: string;
      pinHashId: string;
    }[]
  };
}

interface Response {
  series: {
    pinHashId: string;
    quantityHashId: string;
    measurements: Measurement[];
  }[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/',
  right: { environment: 'READ' },
  query: Joi.object().keys({
    startAt: Joi.date().required().example('2019-12-31T15:23Z'),
    endAt: Joi.date().required().example('2021-01-01T00:00Z').description('Up to not including'),
    series: Joi.array().max(40).items(Joi.object().keys({
      pinHashId: Joi.string().required().example('e13d57'),
      quantityHashId: Joi.string().required().example('sajia1'),
    })).required(),
  }).required(),
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    series: Joi.array().items(Joi.object().keys({
      pinHashId: Joi.string().required().example('e13d57'),
      quantityHashId: Joi.string().required().example('sajia1'),
      measurements: Joi.array().items(measurementSchema(apiVersion)).required(),
    })).required(),
  }).required(),
  description: 'Get the measurement data for one or more time series for a specified period',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
