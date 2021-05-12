import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

interface Request {
  params: {
    hashId: string;
  };
  query: {
    asOf: Date;
    interval?: 'day' | 'isoweek' | 'month' | 'year' | 'years';
  };
}

type EffectiveRequest = {
  params: Required<Request['params']>;
  query: Required<Request['query']>;
}

type Response = {
  startAt: Date;
  endAt: Date;
  reports: {
    expected: number;
    received: number;
  };
  measurements: {
    good: number;
    serious: number;
    critical: number;
  };
}[];

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/pin-group/:hashId/performance',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('dao97'),
  }).required(),
  query: Joi.object().keys({
    asOf: Joi.date().iso().required().example('2019-12-01T00:00Z'),
    interval: Joi.valid('day', 'isoweek', 'month', 'year', 'years').default('month')
      .description('\'day\': returns 24 elements of 1 hour, \'month\' or \'isoweek\': 1 month of elements of 1 day, \'year\': 12 elements of 1 month, \'years\': 10 elements of 1 year'),
  }).required(),
  right: { environment: 'READ' },
  response: Joi.array().items(Joi.object().keys({
    startAt: Joi.date().required().example('2019-12-01T00:00Z'),
    endAt: Joi.date().required().example('2020-01-01T00:00Z'),
    reports: Joi.object().keys({
      expected: Joi.number().integer().required().example(9),
      received: Joi.number().integer().required().example(8),
    }).required(),
    measurements: Joi.object().keys({
      good: Joi.number().integer().required().example(10),
      serious: Joi.number().integer().required().example(10),
      critical: Joi.number().integer().required().example(10),
    }),
  })).required(),
  description: 'Get the performance of a device linked to a specific pin group identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
