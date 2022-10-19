import Joi from 'joi';
import { ControllerGeneratorOptionsWithClientAndSupplier } from '../../comms/controller';

import { schema as quantitySchema, Quantity } from '../../models/quantity';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

interface Query extends TableQuery {
  environmentReportTypeHashIds?: string[];
  includeDeleted?: boolean;
  deviceQuantityMode?: boolean;
  excludeHashIds?: string[];
}

type Request = {
  query?: Query;
} | undefined;

interface EffectiveQuery extends EffectiveTableQuery {
  environmentReportTypeHashIds?: string[];
  includeDeleted: boolean;
  deviceQuantityMode?: boolean;
  excludeHashIds?: string[];
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  quantity: Quantity;
  environmentQuantity?: Quantity;
}

interface Response {
  nextPageOffset: string | null;
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClientAndSupplier = {
  method: 'get',
  path: '/quantities',
  right: { environment: 'READ', supplier: 'ENVIRONMENT_ADMIN' },
  query: tableQuerySchemaGenerator(Joi.string().valid('name', 'hashId').default('hashId'))
    .keys({
      environmentReportTypeHashIds: Joi.array().items(Joi.string()).description('Limit results to provided report type hashIds. Only valid when requesting for an environment (not a supplier)'),
      includeDeleted: Joi.boolean().default(false),
      deviceQuantityMode: Joi.boolean().default(false),
      excludeHashIds: Joi.array().items(Joi.string().example(['sajia1'])).description('Exclude quantities'),
    }),
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    nextPageOffset: Joi.string().allow(null).example(null).required()
      .description('This is the last page if nextPageOffset is null'),
    rows: Joi.array().items(Joi.object().keys({
      quantity: quantitySchema(apiVersion).required(),
      environmentQuantity: quantitySchema(apiVersion),
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
