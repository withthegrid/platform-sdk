import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as environmentSchema, Environment } from '../../models/environment';
import { schema as gridSchema, Grid } from '../../models/grid';

import { TableQuery, EffectiveTableQuery } from '../../comms/table-controller';

interface Query extends TableQuery {
  includeDeleted?: boolean;
  allEnvironments?: boolean;
}

interface Request {
  query: Query;
}

interface EffectiveQuery extends EffectiveTableQuery {
  includeDeleted: boolean;
  allEnvironments: boolean;
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  environment: Environment;
  grid: Grid;
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/grid',
  query: Joi.object().keys({
    includeDeleted: Joi.boolean().default(false),
    allEnvironments: Joi.boolean().default(false),
    sortBy: Joi.string().valid('hashId').default('hashId'),
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
  right: { environment: 'READ' },
  response: Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      environment: environmentSchema.required(),
      grid: gridSchema.allow(null).required(),
    })).required(),
  }),
  description: 'Search through grids',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
