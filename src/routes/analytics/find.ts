import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { schema as analyticsQuerySchema, AnalyticsQuery } from '../../models/analytics-query';

type Query = AnalyticsQuery;

interface Request {
  query: Query;
}

type ResponseRow = unknown;

interface Response {
  rows: ResponseRow[];
  nextPageOffset: string | null;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/',
  query: analyticsQuerySchema.required(),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    nextPageOffset: Joi.string().allow(null).example(null).required(),
    rows: Joi.array().items(Joi.any()).example([['dao97']]).required(),
  }).required(),
  description: 'Get the results for an analytics dashboard',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
  ResponseRow,
  Query,
};
