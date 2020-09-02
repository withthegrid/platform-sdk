import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as quantitySchema, Quantity } from '../../models/quantity';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

type Query = TableQuery;

interface Request {
  query: Query;
}

interface EffectiveRequest {
  query: EffectiveTableQuery;
}

interface ResponseRow {
  quantity: Quantity;
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/quantities',
  right: { environment: 'READ', supplier: 'ENVIRONMENT_ADMIN' },
  query: tableQuerySchemaGenerator(Joi.string().valid('name', 'hashId').default('hashId')),
  response: Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      quantity: quantitySchema.required(),
    })).required(),
  }),
  description: 'Search through quantities',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
