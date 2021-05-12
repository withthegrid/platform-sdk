import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

import { schema as environmentSchema, Environment } from '../../models/environment';
import { schema as userSchema, User } from '../../models/user';

type Request = Record<string, undefined> | undefined;
type EffectiveRequest = Record<string, undefined>;

interface Response {
  environment?: Environment;
  environmentRights?: string[];
  user: User;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'get',
  path: '/',
  right: {},
  response: Joi.object().keys({
    environment: environmentSchema.description('A random monitoring environment this user has access to'),
    environmentRights: Joi.array().items(Joi.string()).example(['STATIC', 'USERS'])
      .description('See the getting started section about rights'),
    user: userSchema.required(),
  }).required(),
  description: 'Get information about the logged in user',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
