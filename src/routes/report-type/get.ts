import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as reportTypeSchema, ReportType } from '../../models/report-type';
import { schema as quantitySchema, Quantity } from '../../models/quantity';


interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  reportType: ReportType;
  quantities: Quantity[];
}


const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('l19a7s'),
  }).required(),
  right: 'READ',
  response: Joi.object().keys({
    reportType: reportTypeSchema.required(),
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
