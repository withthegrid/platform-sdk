import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as issueSchema, Issue } from '../../models/issue';
import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';
import { schema as pinSchema, Pin } from '../../models/pin';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

interface Query extends TableQuery {
  pinGroupHashId?: string | null;
  edgeHashId?: string | null;
  gridHashId?: string | null;
  mapLayers?: string[] | null;
}

type Request = {
  query?: Query;
} | undefined;

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
  pinGroup: PinGroup;
  subscribed: boolean;
  links: { // TODO 221010 Rob: deprecated
    pinGroup: PinGroup;
    pin: Pin | null;
  }[];
}

interface Response {
  nextPageOffset: string | null;
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/',
  query: tableQuerySchemaGenerator(Joi.string().valid('level', 'createdAt').default('createdAt'))
    .keys({
      pinGroupHashId: Joi.string().allow(null).default(null),
      edgeHashId: Joi.string().allow(null).default(null),
      gridHashId: Joi.string().allow(null).default(null),
      mapLayers: Joi.array().items(Joi.string()).allow(null).default(null),
    }),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    nextPageOffset: Joi.string().allow(null).example(null).required()
      .description('This is the last page if nextPageOffset is null'),
    rows: Joi.array().items(Joi.object().keys({
      issue: issueSchema.required(),
      userName: Joi.string().max(255).allow(null).required()
        .example('John Doe'),
      assignedUserName: Joi.string().allow(null).required().example(null),
      pinGroup: pinGroupSchema.required(),
      subscribed: Joi.boolean().required().example(false),
      links: Joi.array().min(1).items(Joi.object().keys({ // TODO 221010 Rob: deprecated
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
