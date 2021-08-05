import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

import { schema as environmentSchema, Environment } from '../../models/environment';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

type Query = TableQuery;

type Request = {
  query?: Query;
} | undefined;

interface EffectiveRequest {
  query: EffectiveTableQuery;
}

interface ResponseRow {
  environment: Environment;
  environmentRights: string[];
  notificationLevel: 0 | 1 | 2 | null;
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'get',
  path: '/',
  right: {}, // everyone can find an environment
  query: tableQuerySchemaGenerator(Joi.string().valid('hashId', 'name').default('hashId')),
  response: Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      environment: environmentSchema.required(),
      environmentRights: Joi.array().items(Joi.string()).required().example(['STATIC', 'USERS'])
        .description('See the getting started section about rights'),
      notificationLevel: Joi.number().allow(null).required()
        .example(0)
        .description('The user is subscribed to every issue created on a location (pinGroup) in this grid (0), when the issue gets serious (1) or when the issue gets critical (2). If null, the user is not autmatically subscribed to new issues.'),
    })).required(),
  }),
  description: 'Search through monitoring environments. Not useful for machine accounts, as they only have access to a single monitoring environment',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
