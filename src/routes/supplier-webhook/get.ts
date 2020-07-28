import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as supplierWebhook, SupplierWebhook, identifierExample } from '../../models/supplier-webhook';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  webhook: SupplierWebhook;
  identifier: string;
  url: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('f1a4w1'),
  }).required(),
  right: {}, // supplierHashId in header is irrelevant
  response: Joi.object().keys({
    webhook: supplierWebhook.required(),
    identifier: Joi.string().required().example(identifierExample).description('A javascript function that parses the incoming request into a device identifier and report type hashId. See the chapter "User defined code"'),
    url: Joi.string().required().example('https://api.withthegrid.com/iot?s=f1a4w1?t=asd193gaf11234').description('The URL the third party service should use to post data sent by the devices.'),
  }).required(),
  description: 'Get a specific supplier webhook identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
