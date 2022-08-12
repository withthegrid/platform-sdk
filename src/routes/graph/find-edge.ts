import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as edgeSchema, Edge } from '../../models/edge';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

interface Query extends TableQuery {
  coordinates?: [number, number],
  includeDeleted?: boolean;
  boundingBox?: [number, number, number, number];
}

type Request = {
  query?: Query;
} | undefined;

interface EffectiveQuery extends EffectiveTableQuery {
  coordinates?: [number, number],
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
      coordinates: Joi.array().length(2).items(
        Joi.number().min(-180).max(180).required(),
        Joi.number().min(-90).max(90).required(),
      )
        .example([4.884707950517225, 52.37502141913572])
        .description('[lon, lat] in WGS84'),
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
