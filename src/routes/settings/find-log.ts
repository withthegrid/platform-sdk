import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as logSchema, Log } from '../../models/log';

import { TableQuery, EffectiveTableQuery } from '../../comms/table-controller';

interface Query extends TableQuery {
  objectType: string;
  objectHashId: string;
}

interface Request {
  query: Query;
}

interface EffectiveQuery extends EffectiveTableQuery {
  objectType: string;
  objectHashId: string;
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  log: Log;
  userName: string | null;
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/log',
  query: Joi.object().keys({
    objectType: Joi.string().required().example('command'),
    objectHashId: Joi.string().required().example('ga9741s'),
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
  }).with('lastValueSortColumn', 'lastValueHashId').required(),
  right: { environment: 'AUDIT_TRAIL' },
  response: Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      log: logSchema.required(),
      userName: Joi.string().allow(null).required().example('John Doe'),
    })).required(),
  }).required(),
  description: 'Search the audit log',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
