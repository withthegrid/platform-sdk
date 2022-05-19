import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

interface Request {
  query: {
    email: string;
    password: string;
  };
}

interface Response {
  isCorrectPassword: boolean;
  hasTwoFAEnabled: boolean;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'get',
  path: '/validate-password-login',
  query: Joi.object().keys({
    email: Joi.string().required().example('test@test.com'),
    password: Joi.string().required().example('iampassword'),
  }).required(),
  response: Joi.object().keys({
    isCorrectPassword: Joi.boolean().required().example(true),
    hasTwoFAEnabled: Joi.boolean().required().example(true),
  }).required(),
  right: { },
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
