import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as deviceSchema, Device } from '../../models/device';
import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';

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

interface Response {
  nextPageOffset: string | null;
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
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
  response: Joi.object().keys({
    nextPageOffset: Joi.string().allow(null).example(null).required()
      .description('This is the last page if nextPageOffset is null'),
    rows: Joi.array().items(Joi.object().keys({
      pinGroup: pinGroupSchema.required(),
      device: deviceSchema.allow(null).required(),
    })).required(),
  }),
  description: 'Search through pin groups',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
