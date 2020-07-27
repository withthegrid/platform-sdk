import Joi from '@hapi/joi';
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
    gridHashId?: string | null;
    gridName?: string | null;
    photo?: string;
  };
}

interface Response {
  hashId: string;
  pinGroup: PinGroup;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/pin-group',
  body: Joi.object().keys({
    symbolKey: Joi.string().required().example('cp-pole'),
    geometry: Joi.object().keys({
      type: Joi.string().valid('Point').required().example('Point'),
      coordinates: Joi.array().length(2).items(Joi.number())
        .description('[lon, lat] in WGS84')
        .example([4.884707950517225, 52.37502141913572]),
    }).required(),
    fields: fieldsToServerFullSchema.required().example({ id: 'My measurement location' }),
    mapLayer: Joi.string().invalid('nodes').description('If not provided, the first available one is chosen'),
    gridHashId: Joi.string().allow(null),
    gridName: Joi.string().allow(null).description('If multiple grids exist with the same name, one is chosen at random'),
    photo: Joi.string().description('Should be a dataurl'),
  }).required().nand('gridHashId', 'gridName'),
  right: { environment: 'STATIC' },
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    hashId: Joi.string().required().example('dao97'),
    pinGroup: pinGroupSchema(apiVersion).required(),
  }).required(),
  description: 'Create a pin group',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
