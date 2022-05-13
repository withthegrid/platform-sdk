import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  query: {
    email: string;
    password: string;
  };
}

interface Response {
  isCorrectPassword: boolean;
  isTwoFAEnabled: boolean;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/validate-password',
  query: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).required(),
  response: Joi.object().keys({
    isCorrectPassword: Joi.boolean().required(),
    isTwoFAEnabled: Joi.boolean().required(),
  }).required(),
  right: { },
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
