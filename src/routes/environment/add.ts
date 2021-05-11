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
  }).required(),
  description: 'Create a monitoring environment',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
