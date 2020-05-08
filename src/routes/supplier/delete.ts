// import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

type Request = {};

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'delete',
  path: '/',
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  description: 'Delete a supplier. No user can access it afterwards.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
