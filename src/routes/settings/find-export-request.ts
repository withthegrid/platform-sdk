import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as exportRequestSchema, ExportRequest } from '../../models/export-request';
import { schema as gridSchema, Grid } from '../../models/grid';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

type Query = TableQuery;

interface Request {
  query: Query;
}

type EffectiveQuery = EffectiveTableQuery;

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  exportRequest: ExportRequest;
  grid: Grid | null;
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/export',
  query: tableQuerySchemaGenerator(Joi.string().valid('createdAt').default('createdAt')),
  right: { environment: 'EXPORT' },
  response: Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      exportRequest: exportRequestSchema.required(),
      grid: gridSchema.allow(null).required(),
    })).required(),
  }).required(),
  description: 'Search through export requests',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
