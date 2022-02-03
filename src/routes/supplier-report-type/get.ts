import Joi from 'joi';
import { ControllerGeneratorOptionsWithSupplier } from '../../comms/controller';

import { schema as supplierReportTypeSchema, SupplierReportType } from '../../models/supplier-report-type';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  reportType: SupplierReportType;
  parser: string;
  subscriptionHashId?: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithSupplier = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('y124as'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    reportType: supplierReportTypeSchema(apiVersion).required(),
    parser: Joi.string().required().example('[omitted]').description('A TypeScript function that parses an incoming report. See the chapter "User defined code"'),
    subscriptionHashId: Joi.string().description('If the user is subscribed to (email) alerts on this object, this key is present'),
  }).required(),
  description: 'Get a specific device report type identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
