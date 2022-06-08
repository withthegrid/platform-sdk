import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

interface Request {
  body: {
    code: string;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'post',
  path: '/enable',
  right: { },
  body: Joi.object().keys({
    code: Joi.string().max(255).required().example('123456'),
  }),
  description: 'Checks whether user entered correct code from authenticator app and enables 2FA for user',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
