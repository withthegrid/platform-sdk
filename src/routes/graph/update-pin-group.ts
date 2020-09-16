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
    };
    fields?: FieldsToServerUpdate;
    gridHashId?: string | null;
    mapLayer?: string;
    gridName?: string | null;
    deviceFields?: FieldsToServerUpdate;
    photo?: string | null;
    gridHashIds?: string[];
  };
}

interface Response {
  pinGroup: PinGroup;
  grid: Grid | null;
}

type ResponsesIncludingDeprecated = Response | {
  name: string;
}

let currentApiVersion = 1;
(apiVersion: number) => {
  currentApiVersion = apiVersion;
};
let body;
const baseBody = Joi.object().keys({
  symbolKey: Joi.string().example('cp-rect'),
  geometry: Joi.object().keys({
    type: Joi.string().valid('Point').required(),
    coordinates: Joi.array().length(2).items(Joi.number()),
  }),
  fields: fieldsToServerUpdateSchema,
  mapLayer: Joi.string().invalid('nodes'),
  deviceFields: fieldsToServerUpdateSchema,
  photo: Joi.string().allow(null).description('Should be a dataurl. Null clears the photo'),
}).required()

if (currentApiVersion <= 3) {
  body = baseBody.keys({
    gridHashId: Joi.string().allow(null),
    gridName: Joi.string().allow(null).description('If multiple grids exist with the same name, one is chosen at random'),
  }).required().nand('gridHashId', 'gridName')
} else {
  body = baseBody.keys({
    gridHashIds: Joi.array().allow(null),
  }).required()
}


const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/pin-group/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('dao97'),
  }).required(),
  body: body,
  right: { environment: 'STATIC' },
  description: 'Updates a specific pin group',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
  ResponsesIncludingDeprecated,
};
