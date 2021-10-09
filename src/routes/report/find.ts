import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

interface Query extends TableQuery {
  pinGroupHashId?: string | null;
  edgeHashId?: string | null;
  gridHashId?: string | null;
  mapLayers?: string[] | null;
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
  report: {
    hashId: string;
    deviceHashId: string | null;
    reportTypeHashId: string | null;
    reportTypeType: 'human' | 'device';
    generatedAt: Date;
  };
  pinGroup: PinGroup | null;
  reportTypeName: string;
}

interface Response {
  nextPageOffset: string | null;
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/',
  query: tableQuerySchemaGenerator(Joi.string().valid('generatedAt').default('generatedAt'))
    .keys({
      pinGroupHashId: Joi.string().allow(null).default(null),
      edgeHashId: Joi.string().allow(null).default(null),
      gridHashId: Joi.string().allow(null).default(null),
      mapLayers: Joi.array().items(Joi.string()).allow(null).default(null),
    }),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    nextPageOffset: Joi.string().allow(null).example(null).required()
      .description('This is the last page if nextPageOffset is null'),
    rows: Joi.array().items(Joi.object().keys({
      report: Joi.object().keys({
        hashId: Joi.string().required().example('qoa978'),
        deviceHashId: Joi.string().allow(null).required().example('j1iha9'),
        reportTypeHashId: Joi.string().allow(null).required().example('l19a7s'),
        reportTypeType: Joi.string().valid('human', 'device').example('human').required(),
        generatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
      }).required(),
      pinGroup: pinGroupSchema.allow(null).required(),
      reportTypeName: Joi.string().required().example('Temperature and inclination'),
    })).required(),
  }).required(),
  description: 'Search through reports',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
