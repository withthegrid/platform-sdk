import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

type Request = Record<string, undefined> | undefined;
type EffectiveRequest = Record<string, undefined>;
type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'post',
  path: '/remove-secret',
  right: {},
  description: 'Turns off 2FA for user',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
