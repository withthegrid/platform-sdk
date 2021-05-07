import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as pinSchema, Pin } from '../../models/pin';
import { schema as fieldsToServerFullSchema, FieldsToServerFull } from '../../models/fields/fields-to-server-full';

interface Request {
  params: {
    pinGroupHashId: string;
    edgeHashId?: string | null;
  };
  body: {
    fields: FieldsToServerFull;
    typeKey?: string | null;
  };
}

interface EffectiveRequest {
  params: {
    pinGroupHashId: string;
  };
  body: {
    fields: FieldsToServerFull;
    typeKey: string | null;
    edgeHashId: string | null;
  };
}

type Response = {
  pin: Pin;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/pin-group/:pinGroupHashId/pin',
  params: Joi.object().keys({
    pinGroupHashId: Joi.string().required().example('dao97'),
  }).required(),
  body: Joi.object().keys({
    fields: fieldsToServerFullSchema.required().example({ id: 'My port' }),
    typeKey: Joi.string().allow(null).default(null),
    edgeHashId: Joi.string().allow(null).default(null).example('ka08d'),
  }).required(),
  right: { environment: 'STATIC' },
  response: Joi.object().keys({
    pin: pinSchema.required(),
  }).required(),
  description: 'Create a pin within a pin group',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
