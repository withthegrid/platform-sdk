import Joi from 'joi';
import { ControllerGeneratorOptionsWithSupplier } from '../../comms/controller';
import { Theme, themeSchema } from '../../commons/theme';

interface Request {
  body: {
    name?: string;
    enforceTwoFactorAuthentication?: boolean;
    theme: Theme | null;
    environmentLogo?: string | null;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithSupplier = {
  method: 'put',
  path: '/',
  body: Joi.object().keys({
    name: Joi.string().example('My connectivity environment'),
    enforceTwoFactorAuthentication: Joi.boolean().example(false)
      .description('Describes if users need to have two factor authentication enabled in order to access this environment.'),
    theme: themeSchema.allow(null),
    environmentLogo: Joi.string().allow(null).description('Should be a dataurl. Null clears the photo'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
