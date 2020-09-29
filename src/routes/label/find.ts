import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as labelSchema, Label } from '../../models/label';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

type Query = TableQuery;

interface Request {
  query?: Query;
}

interface EffectiveRequest {
  query: EffectiveTableQuery;
}

interface ResponseRow {
  label: Label;
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/',
  query: tableQuerySchemaGenerator(Joi.string().valid('name').default('name')),
  right: { environment: 'READ' },
  response: Joi.object().keys({
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
