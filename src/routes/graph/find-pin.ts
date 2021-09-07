import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as pinSchema, Pin } from '../../models/pin';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

interface Query extends TableQuery {
  includeDeleted?: boolean;
}

type Request = {
  query?: Query;
} | undefined;

interface EffectiveQuery extends EffectiveTableQuery {
  includeDeleted: boolean;
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  pin: Pin;
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/pin',
  query: tableQuerySchemaGenerator(Joi.string().valid('hashId', 'name').default('hashId'))
    .keys({
      includeDeleted: Joi.boolean().default(false),
    }),
  right: { environment: 'READ' },
  response: (): Joi.ObjectSchema => Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      pin: pinSchema.required(),
    })).required(),
  }),
  description: 'Search through pins',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
