import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as environmentReportTypeSchema, EnvironmentReportType } from '../../models/environment-report-type';
import { schema as quantitySchema, Quantity } from '../../models/quantity';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  reportType: EnvironmentReportType;
  quantities: Quantity[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('l19a7s'),
  }).required(),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    reportType: environmentReportTypeSchema.required(),
    quantities: Joi.array().items(quantitySchema).required(),
  }).required(),
  description: 'Get a specific report type identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
