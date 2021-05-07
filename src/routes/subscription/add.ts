import Joi from 'joi';
import { ControllerGeneratorOptionsWithSupplier } from '../../comms/controller';

interface Request {
  body: {
    objectType: 'supplierReportType' | 'deviceType' | 'supplierWebhook' | 'supplierCertificate';
    objectHashId: string;
  };
}

interface Response {
  hashId: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithSupplier = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    objectType: Joi.string().valid(
      'supplierReportType',
      'deviceType',
      'supplierWebhook',
      'supplierCertificate',
    ).required().example('deviceType'),
    objectHashId: Joi.string().required().example('wasd2'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('dfa1p'),
  }).required(),
  description: 'Subscribe to alerts on objects (currently all of supplier type)',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
