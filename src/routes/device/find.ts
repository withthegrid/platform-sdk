import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as deviceSchema, Device } from '../../models/device';
import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';
import { schema as deviceTypeSchema, DeviceType } from '../../models/device-type';

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
  device: Device;
  deviceType: DeviceType;
  environmentName: string | null;
  environmentHashId: string | null;
  pinGroup: PinGroup | null;
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
  right: { environment: 'READ', supplier: 'ENVIRONMENT_ADMIN' },
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      device: deviceSchema.required(),
      deviceType: deviceTypeSchema.required(),
      environmentName: Joi.string().allow(null).example('My monitoring environment').required(),
      environmentHashId: Joi.string().allow(null).example('f1a4w1').required(),
      pinGroup: pinGroupSchema(apiVersion).allow(null).required().description('Will be null when queried from a connectivity environment'),
    })).required(),
  }),
  description: 'Search through devices',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
