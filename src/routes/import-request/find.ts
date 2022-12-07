import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';
import { importRequestSchema, ImportRequest } from '../../models/import-request';
import { User } from '../../models/user';

type Query = TableQuery;

type Request = {
  query?: Query;
} | undefined;

type EffectiveQuery = EffectiveTableQuery;

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  import: ImportRequest & {
    createdByUsername: User['name'];
  };
}

interface Response {
  nextPageOffset: string | null;
  rows: Array<ResponseRow>;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/',
  query: tableQuerySchemaGenerator(Joi.string().valid('hashId', 'name', 'state', 'updatedAt', 'createdAt').default('name')),
  right: { environment: 'USERS', supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    nextPageOffset: Joi.string().allow(null).example(null).required()
      .description('This is the last page if nextPageOffset is null'),
    rows: Joi.array().items(Joi.object().keys({
      import: importRequestSchema({
        createdByUsername: Joi.string().required().example('John Doe'),
      }).required(),
    })).required(),
  }),
  description: 'Search through imports wihtin a monitoring environment',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
