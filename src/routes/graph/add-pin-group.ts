import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { schema as fieldsToServerFullSchema, FieldsToServerFull } from '../../models/fields/fields-to-server-full';

import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';

interface Request {
  body: {
    symbolKey: string;
    geometry: {
      type: 'Point';
      coordinates: [number, number];
    };
    fields: FieldsToServerFull;
    mapLayer?: string;
    photo?: string;
    gridHashIds: string[]; //this is not optional (from the ticket description)
    gridHashId?: string | null;
    gridName?: string | null; 
  };
}

interface Response {
  hashId: string;
  pinGroups: PinGroup[];
}

interface ResponseDeprecated {
  hashId: string;
  pinGroup: PinGroup;
}

let currentApiVersion = 1;
(apiVersion: number) => {
  currentApiVersion = apiVersion;
};
let body;
const baseBody = Joi.object().keys({
  fields: fieldsToServerFullSchema.required().example({ id: 'My location' }),
  geometry: Joi.object().keys({
    type: Joi.string().valid('Point').required().example('Point'),
    coordinates: Joi.array().length(2).items(Joi.number())
      .description('[lon, lat] in WGS84')
      .example([4.884707950517225, 52.37502141913572]),
  }).required(),
  mapLayer: Joi.string().invalid('nodes').description('If not provided, the first available one is chosen'),
  photo: Joi.string().description('Should be a dataurl'),
  symbolKey: Joi.string().required().example('cp-pole'),
});

if (currentApiVersion <= 3) {
  body = baseBody.keys({
    gridHashId: Joi.string().allow(null).required(),
    gridName: Joi.string().allow(null).description('If multiple grids exist with the same name, one is chosen at random').required(),
  }).required().nand('gridHashId', 'gridName')
} else {
  body = baseBody.keys({
    gridHashIds: Joi.array().items().items(Joi.string()).allow(null).required(),
  }).required()
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/pin-group',
  body: body,
  right: { environment: 'STATIC' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('dao97'),
    pinGroup: pinGroupSchema(currentApiVersion).required(),
  }).required(),
  description: 'Create a pin group',
};


export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
