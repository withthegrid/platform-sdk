import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { AllContent, contentSchemaAlternatives } from '../../models/export-request';

interface MeasurementFilterContentByHashId {
  type: 'measurementFilter';
  measurementFilterHashId: string;
}

// deprecated, to be removed later
interface MeasurementFilterContent {
  type: 'measurementFilter';
  includePinsWithoutReports: boolean;
  reportTypeHashIds: string[];
  gridHashId: string | null;
  pinGroupHashIds: string[];
  quantityHashIds: string[];
  fieldKeys: string[];
  from?: Date;
  to?: Date;
}

// AllContent is still a reference to settings/add-export.ts
interface Request {
  body: {
    content: AllContent | MeasurementFilterContent | MeasurementFilterContentByHashId;
    delimiter: ',' | ';';
    rowDelimiter: '\n' | '\r\n';
  };
}

interface Response {
  hashId: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/export',
  body: Joi.object().keys({
    content: Joi.alternatives().try(
      Joi.object().keys({
        type: Joi.string().required().valid('measurementFilter').example('measurementFilter'),
        measurementFilterHashId: Joi.string().required(),
      }).required(),
      Joi.object().keys({
        type: Joi.string().required().valid('all').example('all'),
        staticOnly: Joi.boolean().required().example(false),
        gridHashId: Joi.string().allow(null).required().example(null),
        from: Joi.date().iso().required().example('2019-12-01T00:00Z'),
        to: Joi.date().iso().required().example('2020-01-01T00:00Z'),
      }).required(),
      Joi.object().keys({
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
  }).required(),
  right: { environment: 'EXPORT' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('maay1'),
  }).required(),
  description: 'Request the creation of a zip file containing a data export',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
