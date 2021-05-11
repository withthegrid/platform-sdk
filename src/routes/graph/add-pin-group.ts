import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { schema as fieldsToServerFullSchema, FieldsToServerFull } from '../../models/fields/fields-to-server-full';

import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';

interface Request {
  body: {
    symbolKey: string;
    geometry: {
      type: 'Point';
      coordinates: [number, number];
    } | null;
    fields: FieldsToServerFull;
    mapLayer?: string;
    gridHashIds?: string[];
    gridName?: string;
    photo?: string;
  };
}

interface RequestV3AndOlder {
  body: {
    symbolKey: string;
    geometry: {
      type: 'Point';
      coordinates: [number, number];
    } | null;
    fields: FieldsToServerFull;
    mapLayer?: string;
    gridHashId?: string | null;
    gridName?: string | null;
    photo?: string;
  };
}

type RequestsIncludingDeprecated = Request | RequestV3AndOlder;

interface Response {
  hashId: string;
  pinGroup: PinGroup;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/pin-group',
  body: (apiVersion: number): Joi.ObjectSchema => {
    const baseBody = Joi.object().keys({
      symbolKey: Joi.string().required().example('cp-pole'),
      geometry: Joi.object().keys({
        type: Joi.string().valid('Point').required().example('Point'),
        coordinates: Joi.array().length(2).items(Joi.number())
          .description('[lon, lat] in WGS84')
          .example([4.884707950517225, 52.37502141913572]),
      }).allow(null).required(),
      fields: fieldsToServerFullSchema.required().example({ id: 'My location' }),
      mapLayer: Joi.string().invalid('nodes').description('If not provided, the first available one is chosen'),
      photo: Joi.string().description('Should be a dataurl'),
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
  RequestsIncludingDeprecated as EffectiveRequestsIncludingDeprecated,
  Response,
};
