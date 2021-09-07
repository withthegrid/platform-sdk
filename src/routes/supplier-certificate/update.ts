import Joi from 'joi';
import { ControllerGeneratorOptionsWithSupplier } from '../../comms/controller';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    identifier?: string;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithSupplier = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('v19a12'),
  }).required(),
  body: Joi.object().keys({
    identifier: Joi.string().description('A javascript function that returns deviceType and identifier. See the chapter "User defined code"'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  description: 'Update the properties of a certificate.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
