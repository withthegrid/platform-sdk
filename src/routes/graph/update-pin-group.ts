import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';


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
    fields?: Record<string, string>;
    gridHashId?: string | null;
    mapLayer?: string;
    gridName?: string | null;
    properties?: Record<string, string | number>;
    photo?: string | null;
  };
}

interface Response {
  name: string;
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
    fields: Joi.object(),
    gridHashId: Joi.string().allow(null),
    mapLayer: Joi.string().invalid('nodes'),
    gridName: Joi.string().allow(null).description('If multiple grids exist with the same name, one is chosen at random'),
    properties: Joi.object(),
    photo: Joi.string().allow(null).description('Should be a dataurl. Null clears the photo'),
  }).required().nand('gridHashId', 'gridName'),
  response: Joi.object().keys({
    name: Joi.string().required().example('My measurement location'),
  }).required(),
  right: 'STATIC',
  description: 'Updates a specific pin group',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
