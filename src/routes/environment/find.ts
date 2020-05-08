import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as environmentSchema, Environment } from '../../models/environment';

import { TableQuery, EffectiveTableQuery } from '../../comms/table-controller';

type Query = TableQuery;

interface Request {
  query: Query;
}

interface EffectiveRequest {
  query: EffectiveTableQuery;
}

interface ResponseRow {
  environment: Environment;
  environmentRights: string[];
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/',
  right: {}, // everyone can find an environment
  query: Joi.object().keys({
    sortBy: Joi.string().valid('name', 'hashId').default('hashId'),
    descending: Joi.boolean().default(true),
    rowsPerPage: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .default(10),
    search: Joi.string().allow('').default(''),
    lastValueSortColumn: Joi.any(),
    lastValueHashId: Joi.string(),
  })
    .with('lastValueSortColumn', 'lastValueHashId')
    .default(),
  response: Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      environment: environmentSchema.required(),
      environmentRights: Joi.array().items(Joi.string()).required().example(['STATIC', 'USERS'])
        .description('See the getting started section about rights'),
    })).required(),
  }),
  description: 'Search through environments. Not useful for machine accounts, as they only have access to a single environment',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
