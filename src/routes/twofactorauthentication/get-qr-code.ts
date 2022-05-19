import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

interface Request {
  query: {
    email: string;
  };
}

interface Response {
  qrcode: string | null;
  secret: string | null;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'get',
  path: '/get-qr-code',
  query: Joi.object().keys({
    email: Joi.string().required().example('test@test.com'),
  }).required(),
  response: Joi.object().keys({
    qrcode: Joi.string().allow(null).required().example(''),
    secret: Joi.string().allow(null).required().example('aaaaaaaaaaaaaaaaaaaaaaa'),
  }).required(),
  right: {},
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
