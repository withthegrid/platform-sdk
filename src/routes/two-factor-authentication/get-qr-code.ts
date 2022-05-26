import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

type Request = Record<string, undefined> | undefined;
type EffectiveRequest = Record<string, undefined>;

interface Response {
  qrcode: string;
  secret: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'get',
  path: '/get-qr-code',
  response: Joi.object().keys({
    qrcode: Joi.string().allow(null).required().example(''),
    secret: Joi.string().allow(null).required().example(''),
  }).required(),
  right: {},
  description: 'Generates a QR code for user to scan in authentication app',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
