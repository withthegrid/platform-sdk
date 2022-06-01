import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

interface Request {
  body: {
    password: string;
  },
}

interface Response {
  keyuri: string;
  secret: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'post',
  path: '/get-keyuri',
  body: Joi.object().keys({
    password: Joi.string().required().example('imapassword'),
  }).required(),
  response: Joi.object().keys({
    keyuri: Joi.string().allow(null).required().example('iamkeyuri'),
    secret: Joi.string().allow(null).required().example('iamsecret'),
  }).required(),
  right: {},
  description: 'Generates a secret and keyuri for user to set up 2FA',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
