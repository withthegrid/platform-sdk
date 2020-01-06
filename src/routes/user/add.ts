import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  body: {
    name: string;
    email: string;
    rights: string[];
  };
}

interface Response {
  hashId: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    name: Joi.string().required().example('John Doe'),
    email: Joi.string().email({ tlds: false }).required().example('info@acme.com'),
    rights: Joi.array().items(Joi.string()).required().example(['STATIC', 'USERS'])
      .description('See the getting started section about rights'),
  }).required(),
  right: 'USERS',
  response: Joi.object().keys({
    hashId: Joi.string().required().example('b45zo0'),
  }).required(),
  description: 'Add a user to an environment.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
