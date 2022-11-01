import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { schema as fieldsToServerFullSchema, FieldsToServerFull } from '../../models/fields/fields-to-server-full';

import { schema as gridSchema, Grid } from '../../models/grid';

interface Request {
  body: {
  fields: FieldsToServerFull;
  photo?: string;
    pinHashIds?: string[]
  };
}

interface EffectiveRequest {
  body: Request['body'] & Required<Pick<Request['body'], 'pinHashIds'>>
}

interface Response {
  hashId: string;
  grid: Grid;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/pin-grid',
  body: Joi.object().keys({
    fields: fieldsToServerFullSchema.required().example({ id: 'My grid' }),
    photo: Joi.string().description('Should be a dataurl'),
    pinHashIds: Joi.array().items(Joi.string()).default([]).description('Determines the set (and the order) of the pins in the grid'),
  }).required(),
  right: { environment: 'STATIC' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('naud51'),
    grid: gridSchema.required(),
  }).required(),
  description: 'Create a pin grid',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
