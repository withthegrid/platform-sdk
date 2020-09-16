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
  query: Query;
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
  grid?: Grid | null;
  grids?: Grid[] | null;
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

let currentApiVersion = 1;
(apiVersion: number) => {
  currentApiVersion = apiVersion;
};
let response;
const baseRowSchema = Joi.object().keys({
  pinGroup: pinGroupSchema(currentApiVersion).required(),
  device: deviceSchema.allow(null).required(),
});

let row;

if (currentApiVersion <= 2) {
  row = baseRowSchema.keys({
    environment: environmentSchema.required(),
    grid: gridSchema.allow(null).required(),
  });
} else if (currentApiVersion == 3) {
  row = baseRowSchema.keys({
    grid: gridSchema.allow(null).required(),
  });
} else {
  // maybe we need the grids to which a pinGroup belongs, as the relationship changed from one to one to one to many 
  // (same logic as for get-pin-group, where we replaced grid with grids)
  row = baseRowSchema.keys({
    grids: Joi.array().items(gridSchema.allow(null)).required(),
  });
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/pin-group',
  query: tableQuerySchemaGenerator(Joi.string().valid('hashId', 'name').default('hashId'))
    .keys({
      includeDeleted: Joi.boolean().default(false),
    }),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    rows: Joi.array().items(row).required(),
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
  DeprecatedResponseRow,
  ResponsesIncludingDeprecated,
};
