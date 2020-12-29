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
  description: 'Get a specific report type identified by its hashId. For report types of type \'human\', quantities that used to be in the report type but are now deleted from it are not included. Report types of type \'device\' do not contain any quantities.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
