import Joi from 'joi';
import { ControllerGeneratorOptionsWithClientAndSupplier } from '../../comms/controller';

interface Request {
  body: {
    deviceHashIds: string[];
  };
}

type Response = {
  claimTokens: { deviceHashId: string; claimToken: string }[];
};

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClientAndSupplier = {
  method: 'post',
  path: '/claim-tokens',
  body: Joi.object().keys({
    deviceHashIds: Joi.array().items(Joi.string().required()).required().example(['j1iha9']),
  }).required(),
  right: { environment: 'SENSORS', supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    claimTokens: Joi.array().items(Joi.object().keys({
      deviceHashId: Joi.string().required().example('j1iha9'),
      claimToken: Joi.string().required().example('aklasjkl13a23'),
    }).min(1).required()).required(),
  }),
  description: 'Get claim tokens for one or more devices. These claim tokens can be used in a monitoring environment to claim these devices. This request invalidates older claim tokens for these devices. Suppliers cannot acquire a claim token for devices that have already been claimed by a monitoring environment. Users in a monitoring environment cannot acquire a claim token for devices that are linked to a pin group.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
