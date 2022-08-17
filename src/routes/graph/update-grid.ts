import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { schema as fieldsToServerUpdateSchema, FieldsToServerUpdate } from '../../models/fields/fields-to-server-update';

import { schema as gridSchema, Grid } from '../../models/grid';
import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    fields?: FieldsToServerUpdate;
    photo?: string | null;
    pinGroupHashIds?: string[]
    mapLayer?: string;
  };
}

interface Response {
  grid: Grid;
  pinGroups: PinGroup[];
  lastReports: {
    pinGroupHashId: string;
    generatedAt: Date;
  }[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/grid/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('naud51'),
  }).required(),
  body: Joi.object().keys({
    fields: fieldsToServerUpdateSchema.example({ id: 'My grid' }),
    photo: Joi.string().allow(null).description('Should be a dataurl. Null clears the photo'),
    pinGroupHashIds: Joi.array().items(Joi.string()).description('Determines the set (and the order) of the pin groups in the grid'),
    mapLayer: Joi.string().description('Determines a new map layer for all locations of the group'),
  }).required(),
  response: Joi.object().keys({
    grid: gridSchema.required(),
    pinGroups: Joi.array().items(pinGroupSchema).required(),
    lastReports: Joi.array().items(Joi.object({
      pinGroupHashId: Joi.string().required().example('dao97'),
      generatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
    })).required(),
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
