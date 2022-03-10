import { ControllerGeneratorOptionsWithSupplier } from '../../comms/controller';

type Request = Record<string, undefined>;

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithSupplier = {
  method: 'delete',
  path: '/',
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  description: 'Delete a connectivity environment. No user can access it afterwards.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
