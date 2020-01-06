import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

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


const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('f1a4w1'),
  }).required(),
  right: null, // environmentHashId in header is irrelevant
  response: Joi.object().keys({
    environment: environmentSchema.required(),
    environmentRights: Joi.array().items(Joi.string()).required().example(['STATIC', 'USERS'])
      .description('See the getting started section about rights'),
  }).required(),
  description: 'Get a specific environment identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
