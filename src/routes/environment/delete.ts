// import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

type Request = Record<string, undefined>;

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'delete',
  path: '/',
  right: { environment: 'ENVIRONMENT_ADMIN' },
  description: 'Delete a monitoring environment. No user can access it afterwards.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
