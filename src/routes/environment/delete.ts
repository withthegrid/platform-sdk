// import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

type Request = Record<string, undefined>;

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
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
