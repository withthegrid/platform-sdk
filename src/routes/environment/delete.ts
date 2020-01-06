// import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

type Request = {};

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'delete',
  path: '/',
  right: 'ENVIRONMENT_ADMIN',
  description: 'Delete an environment. No user can access it afterwards.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
