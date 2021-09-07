import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as environmentReportTypeSchema, EnvironmentReportType } from '../../models/environment-report-type';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

interface Query extends TableQuery {
  type?: 'human' | 'device';
}

type Request = {
  query?: Query;
} | undefined;

interface EffectiveQuery extends EffectiveTableQuery {
  type?: 'human' | 'device';
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  reportType: EnvironmentReportType;
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/',
  query: tableQuerySchemaGenerator(Joi.string().valid('hashId', 'name').default('hashId'))
    .keys({
      type: Joi.string().valid('human', 'device'),
    }),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      reportType: environmentReportTypeSchema.required(),
    })).required(),
  }),
  description: 'Search through report types',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
