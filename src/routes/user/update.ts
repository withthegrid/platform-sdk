import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    rights: string[];
  };
}

type EffectiveRequest = {
  params: Required<Request['params']>;
  body: Required<Request['body']>;
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('b45zo0'),
  }).required(),
  body: Joi.object().keys({
    rights: Joi.array().items(Joi.string()).required().example(['STATIC', 'USERS'])
      .description('See the getting started section about rights'),
  }).required(),
  right: 'USERS',
  description: 'Update the rights of a user for this environment.',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
