import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as environmentSchema, Environment } from '../../models/environment';
import { schema as issueSchema, Issue } from '../../models/issue';
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
  issue: Issue;
  pinGroup: PinGroup;
  environment: Environment;
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
    sortBy: Joi.string().valid('level', 'createdAt').default('createdAt'),
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
      issue: issueSchema.required(),
      pinGroup: pinGroupSchema.required(),
      environment: environmentSchema.required(),
    })).required(),
  }).required(),
  description: 'Search through issues',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
