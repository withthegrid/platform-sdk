import Joi from 'joi';
import { ControllerGeneratorOptionsWithClientAndSupplier } from '../../comms/controller';

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

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClientAndSupplier = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    name: Joi.string().max(255).required().example('John Doe'),
    email: Joi.string().email({ tlds: false }).required().example('info@acme.com'),
    rights: Joi.array().items(Joi.string()).required().example(['STATIC', 'USERS'])
      .description('See the getting started section about rights'),
  }).required(),
  right: { environment: 'USERS', supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('b45zo0'),
  }).required(),
  description: 'Add a user to a monitoring environment or a connectivity environment.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
