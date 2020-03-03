import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as issueSchema, Issue } from '../../models/issue';
import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';
import { schema as pinSchema, Pin } from '../../models/pin';

import { TableQuery, EffectiveTableQuery } from '../../comms/table-controller';


interface Query extends TableQuery {
  pinGroupHashId?: string | null;
  edgeHashId?: string | null;
  gridHashId?: string | null;
}

interface Request {
  query: Query;
}

interface EffectiveQuery extends EffectiveTableQuery {
  pinGroupHashId: string | null;
  edgeHashId: string | null;
  gridHashId: string | null;
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  issue: Issue;
  userName: string | null;
  assignedUserName: string | null;
  subscribed: boolean;
  links: {
    pinGroup: PinGroup;
    pin: Pin | null;
  }[];
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
      userName: Joi.string().allow(null).required().example('John Doe'),
      assignedUserName: Joi.string().allow(null).required().example(null),
      subscribed: Joi.boolean().required().example(false),
      links: Joi.array().min(1).items(Joi.object().keys({
        pinGroup: pinGroupSchema.required(),
        pin: pinSchema.allow(null).required(),
      })).required(),
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
