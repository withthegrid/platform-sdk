import Joi from 'joi';
import { ControllerGeneratorOptionsWithSupplier } from '../../comms/controller';

import { schema as supplierReportTypeSchema, SupplierReportType } from '../../models/supplier-report-type';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

type Query = TableQuery;

type Request = {
  query?: Query;
} | undefined;

interface EffectiveRequest {
  query: EffectiveTableQuery;
}

interface ResponseRow {
  reportType: SupplierReportType;
}

interface Response {
  nextPageOffset: string | null;
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithSupplier = {
  method: 'get',
  path: '/',
  query: tableQuerySchemaGenerator(Joi.string().valid('hashId', 'name').default('hashId')),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    nextPageOffset: Joi.string().allow(null).example(null).required()
      .description('This is the last page if nextPageOffset is null'),
    rows: Joi.array().items(Joi.object().keys({
      reportType: supplierReportTypeSchema.required(),
    })).required(),
  }),
  description: 'Search through device report types',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
