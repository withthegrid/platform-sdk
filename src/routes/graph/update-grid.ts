import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { schema as fieldsToServerUpdateSchema, FieldsToServerUpdate } from '../../models/fields/fields-to-server-update';

import { schema as gridSchema, Grid } from '../../models/grid';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    fields?: FieldsToServerUpdate;
    photo?: string | null;
    pinGroupHashIds?: string[];
  };
}

interface Response {
  grid: Grid;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/grid/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('naud51'),
  }).required(),
  body: Joi.alternatives().try(
    Joi.object().keys({
      fields: fieldsToServerUpdateSchema.example({ id: 'My grid' }),
      photo: Joi.string().allow(null).description('Should be a dataurl. Null clears the photo'),
    }).required(),
    Joi.object().keys({
      fields: fieldsToServerUpdateSchema.example({ id: 'My grid' }),
      photo: Joi.string().allow(null).description('Should be a dataurl. Null clears the photo'),
      pinGroupHashIds: Joi.array().items(Joi.string()).optional(),
    }).required(),
  ),
  response: Joi.object().keys({
    grid: gridSchema,
  }).required(),
  right: { environment: 'STATIC' },
  description: 'Updates a specific grid',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
