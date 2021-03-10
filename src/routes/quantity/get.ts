import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as quantitySchema, Quantity } from '../../models/quantity';
import { EnvironmentReportType } from '../../models/environment-report-type';

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
    quantity: quantitySchema.required(),
  }).required(),
  description: 'Get a specific quantity identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
