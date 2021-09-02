import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';
import { schema as environmentSchema, Environment } from '../../models/environment';

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
  rows: ResponseRow[];
}

interface ResponseRowV2 {
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

type ResponsesIncludingDeprecated = {
  rows: (ResponseRow | ResponseRowV2)[];
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
  response: (apiVersion: number): Joi.ObjectSchema => {
    if (apiVersion <= 2) {
      return Joi.object().keys({
        rows: Joi.array().items(Joi.object().keys({
          report: Joi.object().keys({
            hashId: Joi.string().required().example('qoa978'),
            deviceHashId: Joi.string().allow(null).required().example('j1iha9'),
            environmentHashId: Joi.string().allow(null).required().example('f1a4w1'),
            generatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
          }).required(),
          pinGroup: pinGroupSchema(apiVersion).allow(null).required(),
          environment: environmentSchema.allow(null).required(),
          reportTypeName: Joi.string().required().example('Temperature and inclination'),
        })).required(),
      });
    }

    return Joi.object().keys({
      rows: Joi.array().items(Joi.object().keys({
        report: Joi.object().keys({
          hashId: Joi.string().required().example('qoa978'),
          deviceHashId: Joi.string().allow(null).required().example('j1iha9'),
          reportTypeHashId: Joi.string().allow(null).required().example('l19a7s'),
          reportTypeType: Joi.string().valid('human', 'device').example('human').required(),
          generatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
        }).required(),
        pinGroup: pinGroupSchema(apiVersion).allow(null).required(),
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
  ResponseRowV2,
  ResponsesIncludingDeprecated,
};
