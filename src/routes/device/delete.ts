import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  body: {
    hashIds: string[];
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/delete',
  body: Joi.object().keys({
    hashIds: Joi.array().items(Joi.string().required()).min(1).required()
      .example(['aklasjkl13a23']),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  description: 'Delete one or more devices. If a device is claimed by an environment, it cannot be deleted.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
