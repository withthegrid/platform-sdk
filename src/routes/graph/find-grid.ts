import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as gridSchema, Grid } from '../../models/grid';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

interface Query extends TableQuery {
  includeDeleted?: boolean;
  type?: 'pinGroup' | 'node';
}

type Request = {
  query?: Query;
} | undefined;

interface EffectiveQuery extends EffectiveTableQuery {
  includeDeleted: boolean;
  type?: 'pinGroup' | 'node';
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  grid: Grid;
  notificationLevel: 0 | 1 | 2 | null;
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/grid',
  query: tableQuerySchemaGenerator(Joi.string().valid('hashId', 'name').default('hashId'))
    .keys({
      includeDeleted: Joi.boolean().default(false),
      type: Joi.string().valid('node', 'pinGroup'),
    }),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      grid: gridSchema.allow(null).required(),
      notificationLevel: Joi.number().valid(0, 1, 2).allow(null).required()
        .example(0)
        .description('The user is subscribed to every issue created on a location (pinGroup) in this grid (0), when the issue gets serious (1) or when the issue gets critical (2). If null, the user is not autmatically subscribed to new issues.'),
    })).required(),
  }),
  description: 'Search through grids',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
