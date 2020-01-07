import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as environmentSchema, Environment } from '../../models/environment';
import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';

import { TableQuery, EffectiveTableQuery } from '../../comms/table-controller';


interface Query extends TableQuery {
  pinGroupHashId?: string | null;
  edgeHashId?: string | null;
  gridHashId?: string | null;
  allEnvironments?: boolean;
}

interface Request {
  query: Query;
}

interface EffectiveQuery extends EffectiveTableQuery {
  pinGroupHashId: string | null;
  edgeHashId: string | null;
  gridHashId: string | null;
  allEnvironments: boolean;
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  report: {
    hashId: string;
    deviceHashId: string | null;
    environmentHashId: string | null;
    generatedAt: Date;
  };
  pinGroup: PinGroup | null;
  environment: Environment | null;
  reportTypeName: string;
}

interface Response {
  rows: ResponseRow[];
}

interface DeprecatedResponseRow {
  report: {
    hashId: string;
    deviceHashId: string | null;
    clientHashId: string | null;
    generatedAt: Date;
    typeKey: string;
    version: number;
    name: string;
    createdByDevice: boolean;
    viewable: boolean;
  };
  nodeGroup: PinGroup | null;
  client: Environment | null;
}

type ResponsesIncludingDeprecated = {
  rows: (ResponseRow | DeprecatedResponseRow)[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/',
  query: Joi.object().keys({
    pinGroupHashId: Joi.string().allow(null).default(null),
    edgeHashId: Joi.string().allow(null).default(null),
    gridHashId: Joi.string().allow(null).default(null),
    allEnvironments: Joi.boolean().default(false),
    sortBy: Joi.string().valid('generatedAt').default('generatedAt'),
    descending: Joi.boolean().default(true),
    rowsPerPage: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .default(10),
    search: Joi.string().allow('').default(''),
    lastValueSortColumn: Joi.any(),
    lastValueHashId: Joi.string(),
  })
    .with('lastValueSortColumn', 'lastValueHashId')
    .default(),
  right: 'READ',
  response: (apiVersion: number): Joi.ObjectSchema => {
    if (apiVersion <= 1) {
      return Joi.object().keys({
        rows: Joi.array().items(Joi.object().keys({
          report: Joi.object().keys({
            hashId: Joi.string().required().example('qoa978'),
            deviceHashId: Joi.string().allow(null).required().example('j1iha9'),
            clientHashId: Joi.string().allow(null).required().example('f1a4w1'),
            generatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
            typeKey: Joi.string().required().example('cp-pole'),
            version: Joi.number().integer().required().example(1),
            name: Joi.string().required().example('default'),
            createdByDevice: Joi.boolean().required().example(true),
            viewable: Joi.boolean().required().example(true),
          }).required(),
          nodeGroup: pinGroupSchema.allow(null).required(),
          client: environmentSchema.allow(null).required(),
        })).required(),
      }).required();
    }

    return Joi.object().keys({
      rows: Joi.array().items(Joi.object().keys({
        report: Joi.object().keys({
          hashId: Joi.string().required().example('qoa978'),
          deviceHashId: Joi.string().allow(null).required().example('j1iha9'),
          environmentHashId: Joi.string().allow(null).required().example('f1a4w1'),
          generatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
        }).required(),
        pinGroup: pinGroupSchema.allow(null).required(),
        environment: environmentSchema.allow(null).required(),
        reportTypeName: Joi.string().required().example('Temperature and inclination'),
      })).required(),
    }).required();
  },
  description: 'Search through reports',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
  ResponsesIncludingDeprecated,
};
