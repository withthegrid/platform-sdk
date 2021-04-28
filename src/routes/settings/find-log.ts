import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as logSchema, Log } from '../../models/log';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

interface Query extends TableQuery {
  objectType?: string;
  objectHashId?: string;
  environmentType?: string;
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
  query: tableQuerySchemaGenerator(Joi.string().valid('hashId').default('hashId'))
    .keys({
      objectType: Joi.string().example('command'),
      objectHashId: Joi.string().example('ga9741s'),
      environmentType: Joi.string().example('monitoring'),
    }),
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
