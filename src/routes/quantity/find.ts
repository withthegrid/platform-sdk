import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as quantitySchema, Quantity } from '../../models/quantity';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

interface Query extends TableQuery {
  environmentReportTypeHashIds?: string[];
  includeDeleted?: boolean;
  deviceQuantityMode?: boolean;
}

type Request = {
  query?: Query;
} | undefined;

interface EffectiveQuery extends EffectiveTableQuery {
  environmentReportTypeHashIds?: string[];
  includeDeleted: boolean;
  deviceQuantityMode?: boolean;
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  quantity: Quantity;
  environmentQuantity?: Quantity;
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/quantities',
  right: { environment: 'READ', supplier: 'ENVIRONMENT_ADMIN' },
  query: tableQuerySchemaGenerator(Joi.string().valid('name', 'hashId').default('hashId'))
    .keys({
      environmentReportTypeHashIds: Joi.array().items(Joi.string()).description('Limit results to provided report type hashIds. Only valid when requesting for an environment (not a supplier)'),
      includeDeleted: Joi.boolean().default(false),
      deviceQuantityMode: Joi.boolean().default(false),
    }),
  response: Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      quantity: quantitySchema.required(),
      environmentQuantity: quantitySchema,
    })).required(),
  }),
  description: 'Search through quantities',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
