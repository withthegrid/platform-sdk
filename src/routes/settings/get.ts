import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as environmentSchema, Environment } from '../../models/environment';
import { schema as userSchema, User } from '../../models/user';

type Request = Record<string, undefined>;

interface Response {
  environment?: Environment;
  environmentRights?: string[];
  user: User;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/',
  right: {},
  response: Joi.object().keys({
    environment: environmentSchema.description('A random environment this user has access to'),
    environmentRights: Joi.array().items(Joi.string()).example(['STATIC', 'USERS'])
      .description('See the getting started section about rights'),
    user: userSchema.required(),
  }).required(),
  description: 'Get information about the logged in user',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
