import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { schema as fieldsToServerUpdateSchema, FieldsToServerUpdate } from '../../models/fields/fields-to-server-update';

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
    } | null;
    fields?: FieldsToServerUpdate;
    gridHashIds?: string[];
    gridName?: string;
    mapLayer?: string;
    deviceFields?: FieldsToServerUpdate;
    photo?: string | null;
  };
}

interface RequestV3AndOlder {
  params: {
    hashId: string;
  };
  body: {
    symbolKey?: string;
    geometry?: {
      type: 'Point';
      coordinates: [number, number];
    } | null;
    fields?: FieldsToServerUpdate;
    gridHashId?: string | null;
    mapLayer?: string;
    gridName?: string | null;
    deviceFields?: FieldsToServerUpdate;
    photo?: string | null;
  };
}

type RequestsIncludingDeprecated = Request | RequestV3AndOlder;

interface Response {
  pinGroup: PinGroup;
  grids: Grid[];
}

interface ResponseV3 {
  pinGroup: PinGroup;
  grid: Grid | null;
}

interface ResponseV2AndOlder {
  name: string;
}

type ResponsesIncludingDeprecated = Response | ResponseV3 | ResponseV2AndOlder;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/pin-group/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('dao97'),
  }).required(),
  body: (apiVersion: number): Joi.ObjectSchema => {
    const baseBody = Joi.object().keys({
      symbolKey: Joi.string().example('cp-rect'),
      geometry: Joi.object().keys({
        type: Joi.string().valid('Point').required(),
        coordinates: Joi.array().length(2).items(Joi.number()),
      }).allow(null),
      fields: fieldsToServerUpdateSchema,
      mapLayer: Joi.string().invalid('nodes'),
      deviceFields: fieldsToServerUpdateSchema,
      photo: Joi.string().allow(null).description('Should be a dataurl. Null clears the photo'),
    });

    if (apiVersion <= 3) {
      return baseBody.keys({
        gridHashId: Joi.string().allow(null),
        gridName: Joi.string().allow(null).description('If multiple grids exist with the same name, one is chosen at random'),
      }).required().nand('gridHashId', 'gridName');
    }
    return baseBody.keys({
      gridHashIds: Joi.array().items(Joi.string()).description('PinGroups will be added at the end of the list in a grid'),
      gridName: Joi.string().description('Ensures the pinGroup is part of a grid with the provided name. If multiple grids exist with the same name, one is chosen at random'),
    }).required();
  },
  response: (apiVersion: number): Joi.ObjectSchema => {
    if (apiVersion <= 2) {
      return Joi.object().keys({
        name: Joi.string().required().example('My location'),
      }).required();
    }
    if (apiVersion <= 3) {
      return Joi.object().keys({
        pinGroup: pinGroupSchema(apiVersion).required(),
        grid: gridSchema.allow(null).required(),
      }).required();
    }
    return Joi.object().keys({
      pinGroup: pinGroupSchema(apiVersion).required(),
      grids: Joi.array().items(gridSchema).required(),
    }).required();
  },
  right: { environment: 'STATIC' },
  description: 'Updates a specific pin group',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  RequestsIncludingDeprecated as EffectiveRequestsIncludingDeprecated,
  Response,
  ResponsesIncludingDeprecated,
};
