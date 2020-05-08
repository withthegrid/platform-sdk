import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as pinSchema, Pin } from '../../models/pin';
import { fieldsSchema, Fields } from '../../models/field-configuration';

interface Request {
  params: {
    pinGroupHashId: string;
  };
  body: {
    fields: Fields;
    typeKey?: string | null;
  };
}

interface EffectiveRequest {
  params: {
    pinGroupHashId: string;
  };
  body: {
    fields: Fields;
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
    fields: fieldsSchema.required().example({ id: 'My connecting point' }),
    typeKey: Joi.string().allow(null).default(null),
  }).required(),
  right: { environment: 'STATIC' },
  response: pinSchema.required(),
  description: 'Create a pin within a pin group',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
