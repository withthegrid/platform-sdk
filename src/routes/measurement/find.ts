import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { BaseFields, schema as baseFieldsSchema } from '../../models/fields/base-fields';
import { Measurement, schema as measurementSchema } from '../../models/measurement';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

interface Query extends TableQuery {
  pinGroupHashIds: string[]; // max 50
  quantityHashIds?: string[]; // max 20
  fieldsKeys?: string[]; // max 20
  since?: Date; // including
  before?: Date; // not including
}

type Request = {
  query: Query;
}

interface EffectiveQuery extends EffectiveTableQuery {
  pinGroupHashIds: string[]; // max 50
  quantityHashIds: string[]; // max 20
  fieldsKeys: string[]; // max 20
  since?: Date; // including
  before?: Date; // not including
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  reportHashId: string;
  generatedAt: Date;
  reportType: {
    type: 'human' | 'device';
    hashId: string;
    name: string;
  };
  pinGroupHashId: string;
  pin: {
    hashId: string;
    name: string;
  };
  pinGroupFields: BaseFields; // so no files
  observations: {
    measurement: Measurement;
    quantityHashId: string;
  }[];
}

interface Response {
  nextPageOffset: string | null;
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/quantities',
  right: { environment: 'READ' },
  query: tableQuerySchemaGenerator(
    Joi.string().valid('generatedAt').default('generatedAt'),
    500,
  ).keys({
    pinGroupHashIds: Joi.array().min(1).max(50).items(Joi.string().example('dao97').required())
      .required(),
    quantityHashIds: Joi.array().max(20).items(Joi.string().example('sajia1'))
      .default([]),
    fieldsKeys: Joi.array().max(20).items(Joi.string()).default([]),
    since: Joi.date(),
    before: Joi.date(),
  }),
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    nextPageOffset: Joi.string().allow(null).required(),
    rows: Joi.array().items(Joi.object().keys({
      reportHashId: Joi.string().required().example('qoa978'),
      generatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
      reportType: Joi.object().keys({
        type: Joi.string().valid('human', 'device').example('human').required(),
        hashId: Joi.string().required().example('l19a7s'),
        name: Joi.string().required().example('Temperature and inclination'),
      }).required(),
      pinGroupHashId: Joi.string().required().example('dao97'),
      pin: Joi.object().keys({
        hashId: Joi.string().required().example('e13d57'),
        name: Joi.string().required().example('My port'),
      }).required(),
      pinGroupFields: baseFieldsSchema.required(), // so no files
      observations: Joi.array().items(Joi.object().keys({
        measurement: measurementSchema(apiVersion).required(),
        quantityHashId: Joi.string().required().example('sajia1'),
      })).required(),
    })).required(),
  }),
  description: 'Search through measurements',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
