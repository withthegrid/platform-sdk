import Joi from 'joi';
import { ControllerGeneratorOptionsWithClientAndSupplier } from '../../comms/controller';

import { schema as deviceSchema, Device } from '../../models/device';
import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';
import { schema as deviceTypeSchema, DeviceType } from '../../models/device-type';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

interface Query extends TableQuery {
  forCommandTypeHashId?: string;
}

type Request = {
  query?: Query;
} | undefined;

interface EffectiveQuery extends EffectiveTableQuery {
  forCommandTypeHashId?: string;
}

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
  nextPageOffset: string | null;
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClientAndSupplier = {
  method: 'get',
  path: '/',
  query: tableQuerySchemaGenerator().keys({
    forCommandTypeHashId: Joi.string().description('Filter the results on devices types that are able to receive commands of this type'),
  }),
  right: { environment: 'READ', supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    nextPageOffset: Joi.string().allow(null).example(null).required()
      .description('This is the last page if nextPageOffset is null'),
    rows: Joi.array().items(Joi.object().keys({
      device: deviceSchema.required(),
      deviceType: deviceTypeSchema.required(),
      environmentName: Joi.string().allow(null).example('My monitoring environment').required(),
      environmentHashId: Joi.string().allow(null).example('f1a4w1').required(),
      pinGroup: pinGroupSchema.allow(null).required().description('Will be null when queried from a connectivity environment'),
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
