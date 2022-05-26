import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

type Request = Record<string, undefined> | undefined;
type EffectiveRequest = Record<string, undefined>;

interface Response {
  keyuri: string;
  secret: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'get',
  path: '/get-keyuri',
  response: Joi.object().keys({
    keyuri: Joi.string().allow(null).required().example(''),
    secret: Joi.string().allow(null).required().example(''),
  }).required(),
  right: {},
  description: 'Generates a secret and keyuri for user to set up 2FA',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
