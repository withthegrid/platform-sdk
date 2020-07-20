import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as nodeSchema, Node } from '../../models/node';

import { TableQuery, EffectiveTableQuery } from '../../comms/table-controller';

interface Query extends TableQuery {
  includeDeleted?: boolean;
}

interface Request {
  query: Query;
}

interface EffectiveQuery extends EffectiveTableQuery {
  includeDeleted: boolean;
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  node: Node;
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/node',
  query: Joi.object().keys({
    includeDeleted: Joi.boolean().default(false),
    sortBy: Joi.string().valid('hashId', 'name').default('hashId'),
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
      node: nodeSchema.required(),
    })).required(),
  }),
  description: 'Search through nodes',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
