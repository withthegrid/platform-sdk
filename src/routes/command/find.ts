import Joi from 'joi';
import { ControllerGeneratorOptionsWithClientAndSupplier } from '../../comms/controller';

import { schema as commandSchema, Command } from '../../models/command';
import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';
import { schema as commandTypeSchema, CommandType } from '../../models/command-type';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

interface Query extends TableQuery {
  pinGroupHashId?: string | null;
  edgeHashId?: string | null;
  gridHashId?: string | null;
}

type Request = {
  query?: Query;
} | undefined;

interface EffectiveQuery extends EffectiveTableQuery {
  pinGroupHashId: string | null;
  edgeHashId: string | null;
  gridHashId: string | null;
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  command: Command;
  commandType: CommandType;
  pinGroup: PinGroup | null;
}

interface Response {
  nextPageOffset: string | null;
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClientAndSupplier = {
  method: 'get',
  path: '/',
  query: tableQuerySchemaGenerator().keys({
    pinGroupHashId: Joi.string().allow(null).default(null),
    edgeHashId: Joi.string().allow(null).default(null),
    gridHashId: Joi.string().allow(null).default(null),
  }),
  right: { environment: 'READ', supplier: 'ENVIRONMENT_ADMIN' },
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    nextPageOffset: Joi.string().allow(null).example(null).required()
      .description('This is the last page if nextPageOffset is null'),
    rows: Joi.array().items(Joi.object().keys({
      command: commandSchema.required(),
      commandType: commandTypeSchema.required(),
      pinGroup: pinGroupSchema(apiVersion).allow(null).required(),
    })).required(),
  }),
  description: 'Search through commands',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
