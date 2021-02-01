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
      ...contentSchemaAlternatives,
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
