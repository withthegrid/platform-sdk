import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as userSubscriptionSchema, UserSubscription } from '../../models/user-subscription';
import { schema as supplierSchema, Supplier } from '../../models/supplier';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

interface Query extends TableQuery {
  supplierHashId?: string;
}

type Request = {
  query?: Query;
} | undefined;

interface EffectiveQuery extends EffectiveTableQuery {
  supplierHashId?: string;
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  objectName: string;
  subscription: UserSubscription;
  supplier: Supplier;

}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/',
  right: {}, // all logged in users
  query: tableQuerySchemaGenerator(Joi.string().valid('hashId', 'objectType').default('hashId')).keys({
    supplierHashId: Joi.string(),
  }),
  response: Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      objectName: Joi.string().required().example('My device'),
      subscription: userSubscriptionSchema.required(),
      supplier: supplierSchema.required(),
    })).required(),
  }),
  description: 'Search through connectivity environments. Not useful for machine accounts, as they only have access to a single connectivity environment',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
