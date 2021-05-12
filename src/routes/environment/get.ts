import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

import { schema as environmentSchema, Environment } from '../../models/environment';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  environment: Environment;
  environmentRights: string[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('f1a4w1'),
  }).required(),
  right: {}, // environmentHashId in header is irrelevant
  response: Joi.object().keys({
    environment: environmentSchema.required(),
    environmentRights: Joi.array().items(Joi.string()).required().example(['STATIC', 'USERS'])
      .description('See the getting started section about rights'),
  }).required(),
  description: 'Get a specific monitoring environment identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
