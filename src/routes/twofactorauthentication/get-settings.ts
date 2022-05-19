import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

interface Request {
  query: {
    email: string;
  };
}

interface Response {
  hasTwoFAEnabled: boolean;
  isAllowedTurnOffTwoFA: boolean;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'get',
  path: '/get-settings',
  query: Joi.object().keys({
    email: Joi.string().required().example('test@test.com'),
  }).required(),
  response: Joi.object().keys({
    hasTwoFAEnabled: Joi.boolean().required().example(true),
    isAllowedTurnOffTwoFA: Joi.boolean().required().example(true),
  }).required(),
  right: {},
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
