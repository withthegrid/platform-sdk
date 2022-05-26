import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

type Request = Record<string, undefined> | undefined;
type EffectiveRequest = Record<string, undefined>;
type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'post',
  path: '/remove-secret',
  right: {},
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
