import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as pinSchema, Pin } from '../../models/pin';

interface Request {
  params: {
    pinGroupHashId: string;
  };
  body: {
    fields: Record<string, string>;
    typeKey?: string | null;
  };
}

interface EffectiveRequest {
  params: {
    pinGroupHashId: string;
  };
  body: {
    fields: Record<string, string>;
    typeKey: string | null;
  };
}

type Response = Pin;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/pin-group/:pinGroupHashId/pin',
  params: Joi.object().keys({
    pinGroupHashId: Joi.string().required().example('dao97'),
  }).required(),
  body: Joi.object().keys({
    fields: Joi.object().required().example({ id: 'My connecting point' }),
    typeKey: Joi.string().allow(null).default(null),
  }).required(),
  right: 'STATIC',
  response: pinSchema.required(),
  description: 'Create a pin within a pin group',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
