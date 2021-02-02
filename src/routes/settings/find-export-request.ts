import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { ExportRequest } from '../../models/export-request';

import { TableQuery, EffectiveTableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';

type Query = TableQuery;

type Request = {
  query?: Query;
} | undefined;

type EffectiveQuery = EffectiveTableQuery;

interface EffectiveRequest {
  query: EffectiveQuery;
}

interface ResponseRow {
  exportRequest: ExportRequest;
}

interface Response {
  rows: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/export',
  query: tableQuerySchemaGenerator(Joi.string().valid('createdAt').default('createdAt')),
  right: { environment: 'EXPORT' },
  response: Joi.object().keys({
    rows: Joi.array().items(Joi.object().keys({
      exportRequest: Joi.object().keys({
        hashId: Joi.string().required().example('maay1'),
        content: Joi.alternatives().try(
          Joi.object().keys({
            type: Joi.string().required().valid('all').example('all'),
            staticOnly: Joi.boolean().required().example(false),
            gridHashId: Joi.string().allow(null).required().example(null),
            from: Joi.date().iso().required().example('2019-12-01T00:00Z'),
            to: Joi.date().iso().required().example('2020-01-01T00:00Z'),
          }).required(),
          Joi.object().keys({
            name: Joi.string().required().example('Power at South district'),
            description: Joi.string().allow('').default('').example('Shows measurements of power at South district related locations'),
            type: Joi.string().required().valid('measurementFilter').example('measurementFilter'),
            includePinsWithoutReports: Joi.boolean().required().example(true),
            reportTypeHashIds: Joi.array().min(1).max(20).items(Joi.string().example('l19a7s'))
              .default([]),
            gridHashId: Joi.string().allow(null).required(),
            pinGroupHashIds: Joi.array().min(0).max(50).items(Joi.string().example('dao97'))
              .required(),
            quantityHashIds: Joi.array().max(20).items(Joi.string().example('sajia1'))
              .default([]),
            fieldKeys: Joi.array().max(20).items(Joi.string().example('id')).default([]),
            from: Joi.date().iso().example('2019-12-01T00:00Z'),
            to: Joi.date().iso().example('2020-01-01T00:00Z'),
          }).required(),
        ).required(),
        delimiter: Joi.string().valid(',', ';').required().example(','),
        rowDelimiter: Joi.string().valid('\n', '\r\n').required().example('\n'),
        status: Joi.string().valid('waiting', 'creating', 'available', 'deleted').required().example('available'),
        createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
      }).required(),
    })).required(),
  }).required(),
  description: 'Search through export requests',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  ResponseRow,
};
