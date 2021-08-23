import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

import { schema as userEnvironmentSettingsSchema, UserEnvironmentSettings } from '../../models/user-environment-settings';
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
  userEnvironmentSettings: UserEnvironmentSettings,
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
      userEnvironmentSettings: userEnvironmentSettingsSchema.required(),
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
