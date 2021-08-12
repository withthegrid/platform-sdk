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
  notificationLevel?: 0 | 1 | 2 | null;
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
    notificationLevel: Joi.number().valid(0, 1, 2).allow(null)
      .example(0)
      .description('The user is subscribed to every issue created on locations in this environment (0), when the issue gets serious (1) or when the issue gets critical (2). If null, the user is not autmatically subscribed to new issues.'),
  }).required(),
  description: 'Get information about the logged in user',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
