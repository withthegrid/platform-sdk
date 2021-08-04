import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { BaseFields, schema as baseFieldsSchema } from '../../models/fields/base-fields';
import { Measurement, schema as measurementSchema } from '../../models/measurement';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

interface Query extends TableQuery {
  includePinsWithoutReports?: boolean;
  reportTypeHashIds: string[]; // max 20
  gridHashId?: string;
  pinGroupHashIds?: string[]; // max 50
  quantityHashIds?: string[]; // max 64
  fieldKeys?: string[]; // max 20
  pinFieldKeys?: string[];
  edgeFieldKeys?: string[];
  since?: Date; // including
  before?: Date; // not including
}

type Request = {
  query: Query;
}

interface EffectiveQuery extends EffectiveTableQuery {
  includePinsWithoutReports: boolean;
  reportTypeHashIds: string[];
  gridHashId?: string;
  pinGroupHashIds?: string[];
  quantityHashIds: string[];
  fieldKeys: string[];
  since?: Date; // including
  before?: Date; // not including
}

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  report: {
    hashId: string;
    createdAt: Date;
    updatedAt: Date;
    generatedAt: Date;
    reportTypeHashId: string;
    pinObservations: {
      measurement: Measurement;
      quantityHashId: string;
    }[];
    pinGroupFields: BaseFields; // so no files
  } | null,
  pinGroup: {
    hashId: string;
    name: string;
  },
  pin: {
    hashId: string;
    name: string;
    fields: BaseFields;
  };
  edge: {
    hashId: string;
    name: string;
    fields: BaseFields;
  } | null;
}

interface Response {
  nextPageOffset: string | null;
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/',
  right: { environment: 'READ' },
  query: tableQuerySchemaGenerator(
    Joi.string().valid('pinName', 'generatedAt', 'pinGroupName', 'edgeName').default('pinName'),
    500,
  ).keys({
    includePinsWithoutReports: Joi.boolean().default(true),
    reportTypeHashIds: Joi.array().min(1).max(20).items(Joi.string().example('l19a7s'))
      .default([]),
    gridHashId: Joi.string(),
    pinGroupHashIds: Joi.array().min(1).max(50).items(Joi.string().example('dao97')),
    quantityHashIds: Joi.array().min(1).max(64).items(Joi.string().example('sajia1'))
      .default([]),
    fieldKeys: Joi.array().max(20).items(Joi.string().example('id')).default([]),
    pinFieldKeys: Joi.array().max(20).items(Joi.string().example('id')).default([]),
    edgeFieldKeys: Joi.array().max(20).items(Joi.string().example('id')).default([]),
    since: Joi.date(),
    before: Joi.date(),
  }),
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    nextPageOffset: Joi.string().allow(null).example(null).required()
      .description('This is the last page iff nextPageOffset is null'),
    rows: Joi.array().items(Joi.object().keys({
      report: Joi.object().keys({
        hashId: Joi.string().required().example('qoa978'),
        createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
        updatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
        generatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
        reportTypeHashId: Joi.string().required().example('l19a7s'),
        pinGroupFields: baseFieldsSchema.required().description('Files are not included'),
        pinObservations: Joi.array().items(Joi.object().keys({
          measurement: measurementSchema(apiVersion).required(),
          quantityHashId: Joi.string().required().example('sajia1'),
        })).required(),
      }).allow(null).required()
        .description('only null when there are not reports for this pin'),
      pinGroup: Joi.object().keys({
        hashId: Joi.string().required().example('dao97'),
        name: Joi.string().required().example('My location'),
      }).required(),
      pin: Joi.object().keys({
        hashId: Joi.string().required().example('e13d57'),
        name: Joi.string().required().example('My port'),
        fields: baseFieldsSchema.required().example({ id: 'My port' }).description('Files are not included'),
      }).required(),
      edge: Joi.object().keys({
        hashId: Joi.string().required().example('ka08d'),
        name: Joi.string().required().example('My line'),
        fields: baseFieldsSchema.required().example({ id: 'My line' }).description('Files are not included'),
      }).allow(null).required(),
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
