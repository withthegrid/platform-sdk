import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as pinSchema, Pin } from '../../models/pin';
import { schema as fieldsToServerFullSchema, FieldsToServerFull } from '../../models/fields/fields-to-server-full';
import { schema as gridSchema, Grid } from '../../models/grid';

interface Request {
  params: {
    pinGroupHashId: string;
  };
  body: {
    fields: FieldsToServerFull;
    typeKey?: string | null;
    edgeHashId?: string | null;
    pinGridsHashIds?: string[];
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
    pinGridsHashIds: string[];
  };
}

type Response = {
  pin: Pin;
  grids: Grid[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/pin-group/:pinGroupHashId/pin',
  params: Joi.object().keys({
    pinGroupHashId: Joi.string().required().example('dao97'),
  }).required(),
  body: Joi.object().keys({
    fields: fieldsToServerFullSchema.required().example({ id: 'My port' }),
    typeKey: Joi.string().allow(null).default(null),
    edgeHashId: Joi.string().allow(null).default(null).example('ka08d'),
    pinGridsHashIds: Joi.array().items(Joi.string()).allow(null).default(null),
  }).required(),
  right: { environment: 'STATIC' },
  response: Joi.object().keys({
    pin: pinSchema.required(),
    grids: Joi.array().items(gridSchema),
  }).required(),
  description: 'Create a pin within a pin group',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
