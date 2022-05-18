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
    email: Joi.string().required(),
  }).required(),
  response: Joi.object().keys({
    qrcode: Joi.string().allow(null).required(),
    secret: Joi.string().allow(null).required(),
  }).required(),
  right: {},
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
