import Joi from 'joi';
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

let currentApiVersion = 1;
(apiVersion: number) => {
  currentApiVersion = apiVersion;
};
let body = Joi.object().keys({
  fields: fieldsToServerUpdateSchema.example({ id: 'My grid' }),
  photo: Joi.string().allow(null).description('Should be a dataurl. Null clears the photo'),
}).required()

if (currentApiVersion > 3) {
  body = body.keys({
    pinGroupHashIds: Joi.array().items(Joi.string()).default([]),
  }).required()
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/grid/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('naud51'),
  }).required(),
  body: body,
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
