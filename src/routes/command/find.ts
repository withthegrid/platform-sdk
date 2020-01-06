import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as environmentSchema, Environment } from '../../models/environment';
import { schema as commandSchema, Command } from '../../models/command';
import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';

import { TableQuery, EffectiveTableQuery } from '../../comms/table-controller';


interface Query extends TableQuery {
  pinGroupHashId?: string | null;
  edgeHashId?: string | null;
  gridHashId?: string | null;
  allEnvironments?: boolean;
}

interface Request {
  query: Query;
}

interface EffectiveQuery extends EffectiveTableQuery {
  pinGroupHashId: string | null;
  edgeHashId: string | null;
  gridHashId: string | null;
  allEnvironments: boolean;
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  command: Command;
  pinGroup: PinGroup | null;
  environment: Environment | null;
}

interface Response {
  rows: ResponseRow[];
}


const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/',
  query: Joi.object().keys({
    pinGroupHashId: Joi.string().allow(null).default(null),
    edgeHashId: Joi.string().allow(null).default(null),
    gridHashId: Joi.string().allow(null).default(null),
    allEnvironments: Joi.boolean().default(false),
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
  right: 'READ',
  response: Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      command: commandSchema.required(),
      pinGroup: pinGroupSchema.allow(null).required(),
      environment: environmentSchema.allow(null).required(),
    })).required(),
  }),
  description: 'Search through commands',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
