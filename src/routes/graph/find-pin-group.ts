import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as deviceSchema, Device } from '../../models/device';
import { schema as gridSchema, Grid } from '../../models/grid';
import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';
import { schema as environmentSchema, Environment } from '../../models/environment';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

interface Query extends TableQuery {
  includeDeleted?: boolean;
}

interface Request {
  query?: Query;
}

interface EffectiveQuery extends EffectiveTableQuery {
  includeDeleted: boolean;
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  pinGroup: PinGroup;
  device: Device | null;
  grid: Grid | null;
}

interface Response {
  rows: ResponseRow[];
}

interface DeprecatedResponseRow extends ResponseRow {
  environment: Environment;
}

type ResponsesIncludingDeprecated = {
  rows: (ResponseRow | DeprecatedResponseRow)[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/pin-group',
  query: tableQuerySchemaGenerator(Joi.string().valid('hashId', 'name').default('hashId'))
    .keys({
      includeDeleted: Joi.boolean().default(false),
    }),
  right: { environment: 'READ' },
  response: (apiVersion: number): Joi.ObjectSchema => {
    const baseRowSchema = Joi.object().keys({
      pinGroup: pinGroupSchema(apiVersion).required(),
      device: deviceSchema.allow(null).required(),
      grid: gridSchema.allow(null).required(),
    });

    if (apiVersion <= 2) {
      const row = baseRowSchema.keys({
        environment: environmentSchema.required(),
      });
      return Joi.object().keys({
        rows: Joi.array().items(row).required(),
      });
    }
    return Joi.object().keys({
      rows: Joi.array().items(baseRowSchema).required(),
    });
  },
  description: 'Search through pin groups',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
  DeprecatedResponseRow,
  ResponsesIncludingDeprecated,
};
