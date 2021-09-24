import Joi from 'joi';
import { ControllerGeneratorOptionsWithSupplier } from '../../comms/controller';

import { schema as deviceSchema, Device } from '../../models/device';
import { schema as deviceTypeSchema, DeviceType } from '../../models/device-type';
import { AllActivities } from '../../models/supplier-activities/all-activities';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

type TriggerType = AllActivities['triggerType'];

type Query = TableQuery;

type Request = {
  query?: Query;
} | undefined;

type EffectiveQuery = EffectiveTableQuery;

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
  nextPageOffset: string | null;
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithSupplier = {
  method: 'get',
  path: '/',
  query: tableQuerySchemaGenerator(Joi.string().valid('createdAt').default('createdAt')),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    nextPageOffset: Joi.string().allow(null).example(null).required()
      .description('This is the last page if nextPageOffset is null'),
    rows: Joi.array().items(Joi.object().keys({
      activity: Joi.object().keys({
        hashId: Joi.string().example('2ad91p').required(),
        createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
        triggerType: Joi.string().required().example('handleIncomingRequest'),
        failed: Joi.boolean().required().example(false),
      }).required(),
      device: deviceSchema.allow(null).required(),
      deviceType: deviceTypeSchema.allow(null).required(),
    })).required(),
  }).required(),
  description: 'Search through activity in the connectivity environment',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
