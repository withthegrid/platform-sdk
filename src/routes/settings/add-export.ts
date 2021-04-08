import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { AllContent } from '../../models/export-request';

interface MeasurementFilterContentByHashId {
  type: 'measurementFilter';
  measurementFilterHashId: string;
}

// AllContent is still a reference to settings/add-export.ts
interface Request {
  body: {
    content: AllContent | MeasurementFilterContentByHashId;
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
        measurementFilterHashId: Joi.string().example('k8gh3').required(),
      }).required(),
      Joi.object().keys({
        type: Joi.string().required().valid('all').example('all'),
        staticOnly: Joi.boolean().required().example(false),
        gridHashId: Joi.string().allow(null).required().example(null),
        from: Joi.date().iso().required().example('2019-12-01T00:00Z'),
        to: Joi.date().iso().required().example('2020-01-01T00:00Z'),
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
