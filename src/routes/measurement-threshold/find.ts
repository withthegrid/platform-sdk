import Joi from 'joi';
import { Edge } from '../../models/edge';
import { Pin } from '../../models/pin';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { PinGroup } from '../../models/pin-group';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';
import { Quantity } from '../../models/quantity';
import { stringBeforeV7ElseStringOrTranslationSchema } from '../../models/string-or-translations';
import { schema as siNumberSchema, SiNumber } from '../../models/si-number';

interface Query extends TableQuery {
  quantityHashId?: string | null;
  pinGroupHashId?: string | null;
  edgeHashId?: string | null;
  pinHashId?: string | null;
  type?: 'quantity' | 'port';
}

type Request = {
  query?: Query;
} | undefined;

interface EffectiveQuery extends EffectiveTableQuery {
    quantityHashId?: string | null;
    pinGroupHashId?: string | null;
    edgeHashId?: string | null;
    pinHashId?: string | null;
    type: 'quantity' | 'port';
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface Threshold {
  criticallyLow: SiNumber | null;
  low: SiNumber | null;
  high: SiNumber | null;
  criticallyHigh: SiNumber | null;
}

interface ResponseRow {
  quantity: Pick<Quantity, 'name' | 'hashId'>;
  location: {
    pinGroup: Pick<PinGroup, 'name' | 'hashId'>;
    pin: Pick<Pin, 'name' | 'hashId'>;
    edge: Pick<Edge, 'name' | 'hashId'> | null;
    } | null;
  threshold: Threshold;
}

interface Response {
  nextPageOffset: string | null;
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/',
  query: tableQuerySchemaGenerator(Joi.string().valid('quantityName', 'pinGroupName', 'hashId').default('quantityName')).keys({
    quantityHashId: Joi.string().allow(null).default(null),
    pinGroupHashId: Joi.string().allow(null).default(null),
    edgeHashId: Joi.string().allow(null).default(null),
    pinHashId: Joi.string().allow(null).default(null),
    type: Joi.string().valid('quantity', 'port'),
  }),
  right: { environment: 'THRESHOLDS' },
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    nextPageOffset: Joi.string().allow(null).example(null).required()
      .description('This is the last page if nextPageOffset is null'),
    rows: Joi.array().items(Joi.object().keys({
      quantity: Joi.object().keys({
        name: stringBeforeV7ElseStringOrTranslationSchema(apiVersion).required().example('Temperature'),
        hashId: Joi.string().required().example('wasd2'),
      }).required(),
      location: Joi.object().keys({
        pinGroup: Joi.object().keys({
          name: Joi.string().required().example('My location'),
          hashId: Joi.string().required().example('dao97'),
        }),
        pin: Joi.object().keys({
          name: Joi.string().required().example('My port'),
          hashId: Joi.string().required().example('e13d57'),
        }),
        edge: Joi.object().keys({
          name: Joi.string().required().example('My line'),
          hashId: Joi.string().required().example('ka08d'),
        }).allow(null),
      }).allow(null),
      threshold: Joi.object().keys({
        criticallyLow: siNumberSchema.allow(null).required(),
        low: siNumberSchema.allow(null).required(),
        high: siNumberSchema.allow(null).required(),
        criticallyHigh: siNumberSchema.allow(null).required(),
      }).required(),
    })).required(),
  }),
  description: 'Search through environment thresholds and measurement thresholds',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
