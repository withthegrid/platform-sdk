import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as deviceSchema, Device } from '../../models/device';
import { schema as deviceTypeSchema, DeviceType } from '../../models/device-type';

import { TableQuery, EffectiveTableQuery } from '../../comms/table-controller';


type TriggerType = 'handleCommandDue'
  | 'handleDeletedCommand'
  | 'handleIncomingRequest'
  | 'handleLinkUpdate'
  | 'handleLink'
  | 'handleNewCommand'
  | 'handleUnlink';

interface Query extends TableQuery {
  deviceHashId?: string | null;
  deviceTypeHashId?: string | null;
  triggerType?: TriggerType;
  failed?: boolean;
}


interface Request {
  query: Query;
}

interface EffectiveQuery extends EffectiveTableQuery {
  deviceHashId?: string | null;
  deviceTypeHashId?: string | null;
  triggerType?: TriggerType;
  failed?: boolean;
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  activity: {
    hashId: string;
    createdAt: Date;
    triggerType: TriggerType;
    failed: boolean;
  };
  device: Device | null;
  deviceType: DeviceType | null;
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/',
  query: Joi.object().keys({
    deviceHashId: Joi.string().allow(null),
    deviceTypeHashId: Joi.string().allow(null),
    failed: Joi.boolean(),
    responseCode: Joi.string(),
    sortBy: Joi.string().valid('createdAt').default('createdAt'),
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
      activity: Joi.object().keys({
        hashId: Joi.string().example('2ad91p').required(),
        createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
        deviceHashId: Joi.string().example('j1iha9').required(),
        triggerType: Joi.string().required().example('handleIncomingRequest'),
        failed: Joi.boolean().required().example(false),
      }).required(),
      device: deviceSchema.allow(null).required(),
      deviceType: deviceTypeSchema.allow(null).required(),
    })).required(),
  }).required(),
  description: 'Search through supplier requests',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
