import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

import { schema as environmentWebhookSchema, EnvironmentWebhook } from '../../models/environment-webhook';

interface Request {
  params: {
    deviceTypeHashId: string;
  };
}

interface Response {
  environmentWebhook: EnvironmentWebhook;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'get',
  path: '/:deviceTypeHashId',
  params: Joi.object().keys({
    deviceTypeHashId: Joi.string().required().example('f1a4w1'),
  }).required(),
  right: {}, // supplierHashId in header is irrelevant
  response: Joi.object().keys({
    environmentWebhook: environmentWebhookSchema.required(),
  }).required(),
  description: 'Get a specific webhook shim identified by its device-type hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
