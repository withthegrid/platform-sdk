import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as supplierReportTypeSchema, SupplierReportType } from '../../models/supplier-report-type';


interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  supplierReportType: SupplierReportType;
}


const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('y124as'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    reportType: supplierReportTypeSchema.required(),
  }).required(),
  description: 'Get a specific device report type identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
