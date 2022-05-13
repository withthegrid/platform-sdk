import Joi from 'joi';
import { ControllerGeneratorOptionsWithSupplier } from '../../comms/controller';

interface Request {
  body: {
    name?: string;
    enforceTwoFactorAuthentication?: boolean | null;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithSupplier = {
  method: 'put',
  path: '/',
  body: Joi.object().keys({
    name: Joi.string().example('My connectivity environment'),
    enforceTwoFactorAuthentication: Joi.boolean().allow(null).example(false)
      .description('Describes if users need to have two factor authentication enabled in order to access this environment.'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
