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
  path: '/unclaim',
  body: Joi.object().keys({
    hashIds: Joi.array().items(Joi.string().required()).required().example(['aklasjkl13a23']),
  }).required(),
  right: { environment: 'SENSORS' },
  description: 'Remove one or more devices from this environment. Only use this if you want to return the device to the supplier',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
