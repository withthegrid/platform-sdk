import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

interface Request {
  query: {
    email: string;
    code: string;
  };
}

interface Response {
  isCorrect: boolean;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'get',
  path: '/validate-code-login',
  right: { },
  query: Joi.object().keys({
    email: Joi.string().email({ tlds: false }).required(),
    code: Joi.string().max(255).required(),
  }),
  response: Joi.object().keys({
    isCorrect: Joi.boolean().required(),
  }).required(),
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
