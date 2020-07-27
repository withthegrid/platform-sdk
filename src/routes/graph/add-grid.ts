import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { schema as fieldsToServerFullSchema, FieldsToServerFull } from '../../models/fields/fields-to-server-full';

import { schema as gridSchema, Grid } from '../../models/grid';

interface Request {
  body: {
    fields: FieldsToServerFull;
    photo?: string;
  };
}

interface Response {
  hashId: string;
  grid: Grid;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/grid',
  body: Joi.object().keys({
    fields: fieldsToServerFullSchema.required().example({ id: 'My grid' }),
    photo: Joi.string().description('Should be a dataurl'),
  }).required(),
  right: { environment: 'STATIC' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('naud51'),
    grid: gridSchema.required(),
  }).required(),
  description: 'Create a pin group grid',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
