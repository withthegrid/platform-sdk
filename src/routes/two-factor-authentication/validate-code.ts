import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

interface Request {
  query: {
    code: string;
  };
}

interface Response {
  isCorrect: boolean;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'get',
  path: '/validate-code',
  right: { },
  query: Joi.object().keys({
    code: Joi.string().max(255).required().example('123456'),
  }),
  response: Joi.object().keys({
    isCorrect: Joi.boolean().required().example('true'),
  }).required(),
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
