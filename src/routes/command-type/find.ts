import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as commandTypeSchema, CommandType } from '../../models/command-type';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

type Query = TableQuery;

interface Request {
  query?: Query;
}

interface EffectiveRequest {
  query: EffectiveTableQuery;
}

interface ResponseRow {
  commandType: CommandType;
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/',
  query: tableQuerySchemaGenerator(Joi.string().valid('hashId', 'name').default('hashId')),
  right: { environment: 'READ', supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      commandType: commandTypeSchema.required(),
    })).required(),
  }),
  description: 'Search through command types',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
