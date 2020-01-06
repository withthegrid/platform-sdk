import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as edgeSchema, Edge } from '../../models/edge';

import { TableQuery, EffectiveTableQuery } from '../../comms/table-controller';


interface Query extends TableQuery {
  includeDeleted?: boolean;
  boundingBox?: [number, number, number, number];
}

interface Request {
  query: Query;
}

interface EffectiveQuery extends EffectiveTableQuery {
  includeDeleted: boolean;
  boundingBox?: [number, number, number, number];
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  edge: Edge;
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/edge',
  query: Joi.object().keys({
    includeDeleted: Joi.boolean().default(false),
    sortBy: Joi.string().valid('hashId').default('hashId'),
    descending: Joi.boolean().default(true),
    rowsPerPage: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .default(10),
    search: Joi.string().allow('').default(''),
    boundingBox: Joi.array()
      .items(Joi.number())
      .length(4)
      .description('west, south, east, north'),
    lastValueSortColumn: Joi.any(),
    lastValueHashId: Joi.string(),
  })
    .with('lastValueSortColumn', 'lastValueHashId')
    .default(),
  right: 'READ',
  response: Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      edge: edgeSchema.required(),
    })).required(),
  }),
  description: 'Search through edges',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
