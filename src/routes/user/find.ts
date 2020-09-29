import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as userSchema, User } from '../../models/user';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

type Query = TableQuery;

interface Request {
  query?: Query;
}

type EffectiveQuery = EffectiveTableQuery;

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  user: User;
  rights: string[];
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/',
  query: tableQuerySchemaGenerator(Joi.string().valid('hashId', 'name', 'email').default('name')),
  right: { environment: 'USERS', supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      user: userSchema.required(),
      rights: Joi.array().items(Joi.string()).example(['STATIC', 'USERS'])
        .description('See the getting started section about rights'),
    })).required(),
  }),
  description: 'Search through users wihtin a monitoring environment or a connectivity environment',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
