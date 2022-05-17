import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  query: {
    email: string;
  };
}

interface Response {
  hasTwoFAEnabled: boolean;
  isAllowedTurnOffTwoFA: boolean;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/get-settings',
  query: Joi.object().keys({
    email: Joi.string().required(),
  }).required(),
  response: Joi.object().keys({
    hasTwoFAEnabled: Joi.boolean().required(),
    isAllowedTurnOffTwoFA: Joi.boolean().required(),
  }).required(),
  right: {},
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
