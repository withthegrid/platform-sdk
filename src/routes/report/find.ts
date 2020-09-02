import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';
import { schema as environmentSchema, Environment } from '../../models/environment';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

interface Query extends TableQuery {
  pinGroupHashId?: string | null;
  edgeHashId?: string | null;
  gridHashId?: string | null;
}

interface Request {
  query: Query;
}

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

interface DeprecatedResponseRowV1 {
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
  client: Environment;
}

interface DeprecatedResponseRowV2 {
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
  rows: (ResponseRow | DeprecatedResponseRowV1 | DeprecatedResponseRowV2)[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/',
  query: tableQuerySchemaGenerator(Joi.string().valid('generatedAt').default('generatedAt'))
    .keys({
      pinGroupHashId: Joi.string().allow(null).default(null),
      edgeHashId: Joi.string().allow(null).default(null),
      gridHashId: Joi.string().allow(null).default(null),
    }),
  right: { environment: 'READ' },
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
          nodeGroup: pinGroupSchema(apiVersion).allow(null).required(),
          client: environmentSchema.allow(null).required(),
        })).required(),
      }).required();
    }

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
  DeprecatedResponseRowV1,
  DeprecatedResponseRowV2,
  ResponsesIncludingDeprecated,
};
