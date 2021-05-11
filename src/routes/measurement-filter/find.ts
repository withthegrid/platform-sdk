import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as measurementFilterSchema, MeasurementFilter } from '../../models/measurement-filter';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

type Query = TableQuery;

type Request = {
  query?: Query;
} | undefined;

interface EffectiveRequest {
  query: EffectiveTableQuery;
}

interface ResponseRow {
  measurementFilter: MeasurementFilter;
}

interface Response {
  nextPageOffset: string | null;
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/',
  right: { environment: 'READ' },
  query: tableQuerySchemaGenerator(Joi.string().valid('name', 'hashId', 'updatedAt').default('hashId')),
  response: Joi.object().keys({
    nextPageOffset: Joi.string().allow(null).example(null).required()
      .description('This is the last page iff nextPageOffset is null'),
    rows: Joi.array().items(Joi.object().keys({
      measurementFilter: measurementFilterSchema.required(),
    })).required(),
  }),
  description: 'Search through measurement filters',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
