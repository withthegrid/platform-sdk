import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { fieldsToServerUpdateSchema, FieldsToServerUpdate } from '../../models/field-configuration';

import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';
import { schema as gridSchema, Grid } from '../../models/grid';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    symbolKey?: string;
    geometry?: {
      type: 'Point';
      coordinates: [number, number];
    };
    fields?: FieldsToServerUpdate;
    gridHashId?: string | null;
    mapLayer?: string;
    gridName?: string | null;
    deviceFields?: FieldsToServerUpdate;
    photo?: string | null;
  };
}

interface Response {
  pinGroup: PinGroup;
  grid: Grid;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/pin-group/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('dao97'),
  }).required(),
  body: Joi.object().keys({
    symbolKey: Joi.string().example('cp-rect'),
    geometry: Joi.object().keys({
      type: Joi.string().valid('Point').required(),
      coordinates: Joi.array().length(2).items(Joi.number()),
    }),
    fields: fieldsToServerUpdateSchema,
    gridHashId: Joi.string().allow(null),
    mapLayer: Joi.string().invalid('nodes'),
    gridName: Joi.string().allow(null).description('If multiple grids exist with the same name, one is chosen at random'),
    deviceFields: fieldsToServerUpdateSchema,
    photo: Joi.string().allow(null).description('Should be a dataurl. Null clears the photo'),
  }).required().nand('gridHashId', 'gridName'),
  response: Joi.object().keys({
    pinGroup: pinGroupSchema.required(),
    grid: gridSchema.required(),
  }).required(),
  right: { environment: 'STATIC' },
  description: 'Updates a specific pin group',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
