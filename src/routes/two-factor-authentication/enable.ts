import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

interface Request {
  body: {
    code: string;
  };
}

interface Response {
  jwt: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'post',
  path: '/enable',
  right: {},
  body: Joi.object().keys({
    code: Joi.string().max(255).required().example('123456'),
  }),
  response: Joi.object().keys({
    jwt: Joi.string().required().example('a1234'),
  }),
  description: 'Checks whether user entered correct code from authenticator app and enables 2FA for user. The existing JWT cannot be used in the Authorization header anymore, instead the returned JWT must be used.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
