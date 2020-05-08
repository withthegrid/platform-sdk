import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

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
  certificate: {
    hashId: string;
    name: string;
    createdAt: Date;
  };
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/',
  query: Joi.object().keys({
    sortBy: Joi.string().valid('name', 'hashId').default('hashId'),
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
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      certificate: Joi.object().keys({
        hashId: Joi.string().required().example('v19a12'),
        name: Joi.string().required().example('My certificate'),
        createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
      }).required(),
    })).required(),
  }),
  description: 'Search through certificates',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
