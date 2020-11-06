import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as exportRequestSchema, ExportRequest } from '../../models/export-request';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

type Query = TableQuery;

type Request = {
  query?: Query;
} | undefined;

type EffectiveQuery = EffectiveTableQuery;

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  exportRequest: ExportRequest;
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
