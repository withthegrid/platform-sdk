import Joi from 'joi';
import { ControllerGeneratorOptionsWithClientAndSupplier } from '../../comms/controller';

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

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClientAndSupplier = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('sajia1'),
  }).required(),
  right: { environment: 'READ', supplier: 'ENVIRONMENT_ADMIN' },
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    reportTypes: Joi.array().items(environmentReportTypeSchema(apiVersion)).required(),
    quantity: quantitySchema(apiVersion).required(),
    linkedSupplierQuantities: Joi.array().items(quantitySchema(apiVersion)).required(),
  }).required(),
  description: 'Get a specific quantity identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
