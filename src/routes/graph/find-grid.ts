import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as gridSchema, Grid } from '../../models/grid';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

interface Query extends TableQuery {
  includeDeleted?: boolean;
  type?: 'pinGroup' | 'node';
}

interface Request {
  query: Query;
}

interface EffectiveQuery extends EffectiveTableQuery {
  includeDeleted: boolean;
  type?: 'pinGroup' | 'node';
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  grid: Grid;
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/grid',
  query: tableQuerySchemaGenerator(Joi.string().valid('hashId', 'name').default('hashId'))
    .keys({
      includeDeleted: Joi.boolean().default(false),
      type: Joi.string().valid('node', 'pinGroup'),
    }),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
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
