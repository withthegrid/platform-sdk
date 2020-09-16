import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { schema as fieldsToServerFullSchema, FieldsToServerFull } from '../../models/fields/fields-to-server-full';

import { schema as gridSchema, Grid } from '../../models/grid';

interface Request {
  body: {
    fields: FieldsToServerFull;
    photo?: string;
    pinGroupHashIds?: string[];
  };
}

interface Response {
  hashId: string;
  grid: Grid;
}

let currentApiVersion = 1;
(apiVersion: number) => {
  currentApiVersion = apiVersion;
};
let body;

if (currentApiVersion <= 3) {
  body = Joi.object().keys({
    fields: fieldsToServerFullSchema.required().example({ id: 'My grid' }),
    photo: Joi.string().description('Should be a dataurl'),
  })
} else {
  body = Joi.object().keys({
    fields: fieldsToServerFullSchema.required().example({ id: 'My grid' }),
    photo: Joi.string().description('Should be a dataurl'),
    pinGroupHashIds: Joi.array().items(Joi.string()).default([]),
  })
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/grid',
  body: body,
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
