import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as supplierSchema, Supplier } from '../../models/supplier';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

type Query = TableQuery;

interface Request {
  query: Query;
}

interface EffectiveRequest {
  query: EffectiveTableQuery;
}

interface ResponseRow {
  supplier: Supplier;
  supplierRights: string[];
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/',
  right: {}, // all logged in sers
  query: tableQuerySchemaGenerator(Joi.string().valid('hashId', 'name').default('hashId')),
  response: Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      supplier: supplierSchema.required(),
      supplierRights: Joi.array().items(Joi.string()).required().example(['STATIC', 'USERS'])
        .description('See the getting started section about rights'),
    })).required(),
  }),
  description: 'Search through connectivity environments. Not useful for machine accounts, as they only have access to a single connectivity environment',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
