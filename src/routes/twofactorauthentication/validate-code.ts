import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

interface Request {
  query: {
    email: string;
    code: string;
    secret: string;
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
    email: Joi.string().email({ tlds: false }).required().example('test@test.com'),
    code: Joi.string().max(255).required().example('123456'),
    secret: Joi.string().allow(null).required().example('aaaaaaaaaaaaaaaaaaaaaaaa'),
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
