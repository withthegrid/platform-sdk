import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as quantitySchema, Quantity } from '../../models/quantity';

import { TableQuery, EffectiveTableQuery } from '../../comms/table-controller';

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
  right: 'READ',
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
