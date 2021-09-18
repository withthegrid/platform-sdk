import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

type Query = TableQuery;

type Request = {
  query?: Query;
} | undefined;

interface EffectiveRequest {
  query: EffectiveTableQuery;
}

interface ResponseRow {
  objectType: 'grid' | 'edge' | 'pinGroup';
  hashId: string;
  name: string;
}

interface Response {
  nextPageOffset: string | null;
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/',
  right: { environment: 'READ' },
  query: tableQuerySchemaGenerator(Joi.string().valid('name').default('name')),
  response: Joi.object().keys({
    nextPageOffset: Joi.string().allow(null).example(null).required()
      .description('This is the last page if nextPageOffset is null'),
    rows: Joi.array().items(Joi.object().keys({
      objectType: Joi.string().valid('grid', 'pinGroup', 'edge').required().example('pinGroup'),
      hashId: Joi.string().required().example('dao97'),
      name: Joi.string().required().example('My location'),
    })).required(),
  }),
  description: 'Search through pinGroups, edges and pinGroup-grids',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
