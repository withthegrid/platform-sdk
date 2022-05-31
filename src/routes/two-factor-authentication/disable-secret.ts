import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

interface Request {
  query: {
    password: string;
  },
}
type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'post',
  path: '/disable-secret',
  right: {},
  query: Joi.object().keys({
    password: Joi.string().required().example('imapassword'),
  }).required(),
  description: 'Turns off 2FA for user',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
