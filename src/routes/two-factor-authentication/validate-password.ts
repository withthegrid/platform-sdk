import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

interface Request {
  query: {
    password: string;
  };
}

interface Response {
  isCorrectPassword: boolean;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'get',
  path: '/validate-password',
  query: Joi.object().keys({
    password: Joi.string().required().example('iampassword'),
  }).required(),
  response: Joi.object().keys({
    isCorrectPassword: Joi.boolean().required().example(true),
  }).required(),
  right: { },
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
