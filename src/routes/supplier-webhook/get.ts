import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

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
  subscriptionHashId?: string;
  shimmable: number;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('f1a4w1'),
  }).required(),
  right: {}, // supplierHashId in header is irrelevant
  response: Joi.object().keys({
    webhook: supplierWebhook.required(),
    identifier: Joi.string().max(1000000).required().example(identifierExample)
      .description('A javascript function that parses the incoming request into a device identifier and report type hashId. See the chapter "User defined code"'),
    url: Joi.string().required().example('https://api.withthegrid.com/iot?s=f1a4w1?t=asd193gaf11234').description('The URL the third party service should use to post data sent by the devices.'),
    subscriptionHashId: Joi.string().description('If the user is subscribed to (email) alerts on this object, this key is present'),
    shimmable: Joi.number().required().example(0),
  }).required(),
  description: 'Get a specific webhook identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
