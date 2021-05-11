import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

interface Request {
  params: {
    deviceHashId: string;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/:deviceHashId/unlink',
  params: Joi.object().keys({
    deviceHashId: Joi.string().required().example('j1iha9'),
  }).required(),
  right: { environment: 'SENSORS' },
  description: 'Disconnect a device from a pin group. Future condition reports from this device will no longer be registered on the pin group it was connected to.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
