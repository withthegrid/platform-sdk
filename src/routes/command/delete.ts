import Joi from 'joi';
import { ControllerGeneratorOptionsWithClientAndSupplier } from '../../comms/controller';

interface Request {
  params: {
    hashId: string;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClientAndSupplier = {
  method: 'delete',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('ga9741s'),
  }).required(),
  right: { environment: 'SENSORS', supplier: 'ENVIRONMENT_ADMIN' },
  description: 'Delete a command. Will raise an error if the command cannot be canceled because the device has already executed it or because the device will not be reached in time to let it know that it should ignore the command.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
