import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as edgeSchema, Edge } from '../../models/edge';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

interface Query extends TableQuery {
  location?: { latitude: number, longitude: number},
  includeDeleted?: boolean;
  boundingBox?: [number, number, number, number];
}

type Request = {
  query?: Query;
} | undefined;

interface EffectiveQuery extends EffectiveTableQuery {
  location?: { latitude: number, longitude: number},
  includeDeleted: boolean;
  boundingBox?: [number, number, number, number];
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  edge: Edge;
}

interface Response {
  nextPageOffset: string | null;
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/edge',
  query: tableQuerySchemaGenerator(Joi.string().valid('hashId', 'name', 'proximity').default('hashId'))
    .keys({
      location: Joi.object().keys({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      }),
      includeDeleted: Joi.boolean().default(false),
      boundingBox: Joi.array()
        .items(Joi.number())
        .length(4)
        .description('west, south, east, north'),
    }),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    nextPageOffset: Joi.string().allow(null).example(null).required()
      .description('This is the last page if nextPageOffset is null'),
    rows: Joi.array().items(Joi.object().keys({
      edge: edgeSchema.required(),
    })).required(),
  }),
  description: 'Search through edges',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
