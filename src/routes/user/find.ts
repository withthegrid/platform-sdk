import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as userSchema, User } from '../../models/user';


import { TableQuery, EffectiveTableQuery } from '../../comms/table-controller';


type Query = TableQuery;

interface Request {
  query: Query;
}

type EffectiveQuery = EffectiveTableQuery;

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  user: User;
  environmentRights: string[];
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/',
  query: Joi.object().keys({
    sortBy: Joi.string().valid('hashId').default('hashId'),
    descending: Joi.boolean().default(true),
    rowsPerPage: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .default(10),
    search: Joi.string().allow('').default(''),
    lastValueSortColumn: Joi.any(),
    lastValueHashId: Joi.string(),
  })
    .with('lastValueSortColumn', 'lastValueHashId')
    .default(),
  right: 'USERS',
  response: Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      user: userSchema.required(),
      environmentRights: Joi.array().items(Joi.string()).example(['STATIC', 'USERS'])
        .description('See the getting started section about rights'),
    })).required(),
  }),
  description: 'Search through users',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
