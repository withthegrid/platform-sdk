import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as deviceSchema, Device } from '../../models/device';
import { schema as gridSchema, Grid } from '../../models/grid';
import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';
import { schema as environmentSchema, Environment } from '../../models/environment';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

interface Query extends TableQuery {
  includeDeleted?: boolean;
  forCommandTypeHashId?: string;
  forEdge?: string;
  forGrid?: string;
}

type Request = {
  query?: Query;
} | undefined;

interface EffectiveQuery extends EffectiveTableQuery {
  includeDeleted: boolean;
  forCommandTypeHashId?: string;
  forEdge?: string;
  forGrid?: string;
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  pinGroup: PinGroup;
  device: Device | null;
}

interface ResponseRowV3 {
  pinGroup: PinGroup;
  device: Device | null;
  grid: Grid | null;
}

interface Response {
  rows: ResponseRow[];
}

interface ResponseRowV2AndOlder extends ResponseRowV3 {
  environment: Environment;
}

type ResponsesIncludingDeprecated = {
  rows: (ResponseRow | ResponseRowV3 | ResponseRowV2AndOlder)[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/pin-group',
  query: tableQuerySchemaGenerator(Joi.string().valid('hashId', 'name').default('hashId'))
    .keys({
      includeDeleted: Joi.boolean().default(false),
      forCommandTypeHashId: Joi.string().description('Filter the results on devices types that are able to receive commands of this type'),
      forGrid: Joi.string().description('Find only among pin groups which belongs to specified grid hash id'),
      forEdge: Joi.string().description('Find only among pin groups which belongs to specified edge hash id'),
    }),
  right: { environment: 'READ' },
  response: (apiVersion: number): Joi.ObjectSchema => {
    const baseRowSchema = Joi.object().keys({
      pinGroup: pinGroupSchema(apiVersion).required(),
      device: deviceSchema.allow(null).required(),
    });

    if (apiVersion <= 2) {
      const row = baseRowSchema.keys({
        environment: environmentSchema.required(),
        grid: gridSchema.allow(null).required(),
      });
      return Joi.object().keys({
        rows: Joi.array().items(row).required(),
      });
    }
    if (apiVersion <= 3) {
      const row = baseRowSchema.keys({
        grid: gridSchema.allow(null).required(),
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
  ResponseRowV3,
  ResponseRowV2AndOlder,
  ResponsesIncludingDeprecated,
};
