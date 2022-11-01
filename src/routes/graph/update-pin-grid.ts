import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { schema as fieldsToServerUpdateSchema, FieldsToServerUpdate } from '../../models/fields/fields-to-server-update';

import { schema as gridSchema, Grid } from '../../models/grid';
import { schema as pinSchema, Pin } from '../../models/pin';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    fields?: FieldsToServerUpdate;
    photo?: string | null;
    pinHashIds?: string[]
  };
}

interface Response {
  grid: Grid;
  pins: Pin[];
  lastReports: {
    pinGroupHashId: string;
    generatedAt: Date;
  }[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/pin-grid/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('naud51'),
  }).required(),
  body: Joi.object().keys({
    fields: fieldsToServerUpdateSchema.example({ id: 'My grid' }),
    photo: Joi.string().allow(null).description('Should be a dataurl. Null clears the photo'),
    pinHashIds: Joi.array().items(Joi.string()).description('Determines the set (and the order) of the pins in the grid'),
  }).required(),
  response: Joi.object().keys({
    grid: gridSchema.required(),
    pins: Joi.array().items(pinSchema).required(),
    lastReports: Joi.array().items(Joi.object({
      pinGroupHashId: Joi.string().required().example('dao97'),
      generatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
    })).required(),
  }).required(),
  right: { environment: 'STATIC' },
  description: 'Updates a specific grid of type pin',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
