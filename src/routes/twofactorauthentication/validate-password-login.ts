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
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).required(),
  response: Joi.object().keys({
    isCorrectPassword: Joi.boolean().required(),
    hasTwoFAEnabled: Joi.boolean().required(),
  }).required(),
  right: { },
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
