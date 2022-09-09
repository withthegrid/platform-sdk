import Joi from 'joi';
import { ControllerGeneratorOptionsWithSupplier } from '../../comms/controller';

interface Request {
  body: {
    deviceTypeHashId: string;
    identifierFieldKey: string | null;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithSupplier = {
  method: 'post',
  path: '/update-multiple-devices',
  body: Joi.object().keys({
    deviceTypeHashId: Joi.string().required().example('j1iha9'),
    identifierFieldKey: Joi.string().allow(null).required().example('formFieldKey'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  description: 'Update multiple devices.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
