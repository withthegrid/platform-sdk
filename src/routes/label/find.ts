import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as labelSchema, Label } from '../../models/label';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

type Query = TableQuery;

type Request = {
  query?: Query;
} | undefined;

interface EffectiveRequest {
  query: EffectiveTableQuery;
}

interface ResponseRow {
  label: Label;
}

interface Response {
  nextPageOffset: string | null;
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/',
  query: tableQuerySchemaGenerator(Joi.string().valid('name').default('name')),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    nextPageOffset: Joi.string().allow(null).example(null).required()
      .description('This is the last page if nextPageOffset is null'),
    rows: Joi.array().items(Joi.object().keys({
      label: labelSchema.required(),
    })).required(),
  }).required(),
  description: 'Search through labels',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
