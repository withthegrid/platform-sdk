import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { BaseFields, schema as baseFieldsSchema } from '../../models/fields/base-fields';
import { Measurement, schema as measurementSchema } from '../../models/measurement';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

interface Query extends TableQuery {
  reportTypeHashIds: string[]; // max 20
  pinGroupHashIds: string[]; // max 50
  quantityHashIds?: string[]; // max 20
  fieldKeys?: string[]; // max 20
  since?: Date; // including
  before?: Date; // not including
}

type Request = {
  query: Query;
}

interface EffectiveQuery extends EffectiveTableQuery {
  reportTypeHashIds: string[]; // max 20
  pinGroupHashIds: string[]; // max 50
  quantityHashIds: string[]; // max 20
  fieldKeys: string[]; // max 20
  since?: Date; // including
  before?: Date; // not including
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  reportHashId: string;
  createdAt: Date;
  updatedAt: Date;
  generatedAt: Date;
  reportTypeHashId: string;
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
  path: '/',
  right: { environment: 'READ' },
  query: tableQuerySchemaGenerator(
    Joi.string().valid('generatedAt').default('generatedAt'),
    500,
  ).keys({
    reportTypeHashIds: Joi.array().min(1).max(20).items(Joi.string().example('l19a7s'))
      .default([]),
    pinGroupHashIds: Joi.array().min(1).max(50).items(Joi.string().example('dao97').required())
      .required(),
    quantityHashIds: Joi.array().max(20).items(Joi.string().example('sajia1'))
      .default([]),
    fieldKeys: Joi.array().max(20).items(Joi.string().example('id')).default([]),
    since: Joi.date(),
    before: Joi.date(),
  }),
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    nextPageOffset: Joi.string().allow(null).example(null).required()
      .description('This is the last page iff nextPageOffset is null'),
    rows: Joi.array().items(Joi.object().keys({
      reportHashId: Joi.string().required().example('qoa978'),
      createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
      updatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
      generatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
      reportTypeHashId: Joi.string().required().example('l19a7s'),
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
