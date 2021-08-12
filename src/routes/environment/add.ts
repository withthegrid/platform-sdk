import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';
import { schema as environmentSchema, Environment } from '../../models/environment';

interface Request {
  body: {
    name: string;
  };
}

interface Response {
  environment: Environment;
  environmentRights: string[];
  notificationLevel: 0 | 1 | 2 | null;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    name: Joi.string().required().example('My monitoring environment'),
  }).required(),
  right: {}, // everyone can add an environment
  response: Joi.object().keys({
    environment: environmentSchema.required(),
    environmentRights: Joi.array().items(Joi.string()).required().example(['STATIC', 'USERS'])
      .description('See the getting started section about rights'),
    notificationLevel: Joi.number().valid(0, 1, 2).allow(null).required()
      .example(0)
      .description('The user is subscribed to every issue created on locations in this environment (0), when the issue gets serious (1) or when the issue gets critical (2). If null, the user is not autmatically subscribed to new issues.'),
  }).required(),
  description: 'Create a monitoring environment',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
