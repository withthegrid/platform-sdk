import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as quantitySchema, Quantity } from '../../models/quantity';
import { EnvironmentReportType, schema as environmentReportTypeSchema } from '../../models/environment-report-type';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  reportTypes: EnvironmentReportType[];
  quantity: Quantity;
  linkedSupplierQuantities: Quantity[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('sajia1'),
  }).required(),
  right: { environment: 'READ', supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    reportTypes: Joi.array().items(environmentReportTypeSchema).required(),
    quantity: quantitySchema.required(),
    linkedSupplierQuantities: Joi.array().items(quantitySchema).required(),
  }).required(),
  description: 'Get a specific quantity identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
