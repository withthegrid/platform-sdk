import Joi from 'joi';
import { ControllerGeneratorOptionsWithSupplier } from '../../comms/controller';

import { schema as supplierWebhook, SupplierWebhook } from '../../models/supplier-webhook';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

type Query = TableQuery;

type Request = {
  query?: Query;
} | undefined;

type EffectiveQuery = EffectiveTableQuery;

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  webhook: SupplierWebhook;
  url: string;
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithSupplier = {
  method: 'get',
  path: '/',
  query: tableQuerySchemaGenerator(Joi.string().valid('hashId', 'name').default('hashId')),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      webhook: supplierWebhook.required(),
      url: Joi.string().required().example('https://api.withthegrid.com/iot?s=f1a4w1?t=asd193gaf11234').description('The URL the third party service should use to post data sent by the devices.'),
    })).required(),
  }),
  description: 'Search through webhooks',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
