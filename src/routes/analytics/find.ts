import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
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

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/',
  query: analyticsQuerySchema.required(),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    nextPageOffset: Joi.string().allow(null).required(),
    rows: Joi.array().required(),
  }).required(),
  description: 'Get a specific quantity identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
  ResponseRow,
  Query,
};
