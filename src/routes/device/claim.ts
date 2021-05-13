import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { schema as deviceSchema, Device } from '../../models/device';

interface Request {
  body: {
    claimTokens: string[];
  };
}

type Response = {
  devices: Device[];
};

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/claim',
  body: Joi.object().keys({
    claimTokens: Joi.array().min(1).items(Joi.string().required()).required()
      .example(['aklasjkl13a23']),
  }).required(),
  right: { environment: 'SENSORS' },
  response: Joi.object().keys({
    devices: Joi.array().items(deviceSchema.required()).required(),
  }),
  description: 'Add one or more devices to this monitoring environment by providing their claim tokens. This invalidates the claim token',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
