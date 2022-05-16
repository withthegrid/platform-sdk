import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

import { schema as environmentWebhookSchema, EnvironmentWebhook } from '../../models/environment-webhook';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  environmentWebhook: EnvironmentWebhook;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('f1a4w1'),
  }).required(),
  right: {}, // supplierHashId in header is irrelevant
  response: Joi.object().keys({
    environmentWebhook: environmentWebhookSchema.required(),
  }).required(),
  description: 'Get a specific webhook shim identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
