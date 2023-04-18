import Joi from 'joi';
import { Edge } from '../../models/edge';
import { Pin } from '../../models/pin';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { PinGroup } from '../../models/pin-group';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';
import { Quantity } from '../../models/quantity';
import { schema as stringOrTranslations } from '../../models/string-or-translations';
import { schema as thresholdSchema, Threshold } from '../../models/threshold';
import { Grid } from '../../models/grid';

interface Query extends TableQuery {
  type?: 'quantity' | 'port';
}
type Request = {
  query?: Query;
} | undefined;
interface EffectiveQuery extends EffectiveTableQuery {
  type?: 'quantity' | 'port';
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  quantity: Pick<Quantity, 'name' | 'hashId' | 'unit'>;
  location: {
    pinGroup: Pick<PinGroup, 'name' | 'hashId'>;
    pin: Pick<Pin, 'name' | 'hashId'>;
    edge: Pick<Edge, 'name' | 'hashId'> | null;
  } | null;
  pinGroupGrid: Pick<Grid, 'name' | 'hashId'> | null;
  pinGrid: Pick<Grid, 'name' | 'hashId'> | null;
  threshold: Threshold;
}

interface Response {
  nextPageOffset: string | null;
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/',
  query: tableQuerySchemaGenerator(Joi.string().valid('quantityName', 'pinGroupName', 'pinGroupGridName', 'pinGridName').default('quantityName')).keys({
    type: Joi.string().valid('quantity', 'port'),
  }),
  right: { environment: 'THRESHOLDS' },
  response: Joi.object().keys({
    nextPageOffset: Joi.string().allow(null).example(null).required()
      .description('This is the last page if nextPageOffset is null'),
    rows: Joi.array().items(Joi.object().keys({
      quantity: Joi.object().keys({
        name: stringOrTranslations().required().example('Temperature'),
        hashId: Joi.string().required().example('wasd2'),
        unit: Joi.string().allow(null).default(null)
          .example('K')
          .description('Will be displayed with an SI-prefix (eg. k or M) if relevant'),
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
      pinGroupGrid: Joi.object().keys({
        name: Joi.string().required().example('My location group'),
        hashId: Joi.string().required().example('naud51'),
      }).allow(null),
      pinGrid: Joi.object().keys({
        name: Joi.string().required().example('My port group'),
        hashId: Joi.string().required().example('naud51'),
      }).allow(null),
      threshold: thresholdSchema.required(),
    })).required(),
  }),
  description: 'Search through measurement thresholds on environment and pin level',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
