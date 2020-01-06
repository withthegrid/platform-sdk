import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as userSchema, User } from '../../models/user';


interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  user: User;
  environmentRights: string[];
}


const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('b45zo0'),
  }).required(),
  right: 'USERS',
  response: Joi.object().keys({
    user: userSchema.required(),
    environmentRights: Joi.array().items(Joi.string()).required().example(['STATIC', 'USERS'])
      .description('See the getting started section about rights'),
  }).required(),
  description: 'Get a specific user identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
