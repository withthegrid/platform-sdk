import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  body: ({
    type: 'node' | 'pinGroups';
    hashId: string;
    geometry: {
      type: 'Point';
      coordinates: [number, number];
    };
  } |
  {
    type: 'edge';
    hashId: string;
    geometry: { type: 'LineString'; coordinates: [number, number][] } | { type: 'MultiLineString'; coordinates: [number, number][][] };
  })[];
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/',
  body: Joi.array().items(Joi.alternatives().try(
    Joi.object().keys({
      type: Joi.string().valid('node', 'pinGroup').required().example('pinGroup'),
      hashId: Joi.string().required().example('dao97'),
      geometry: Joi.object().keys({ // nodes and pinGroups
        type: Joi.string().valid('Point').required().example('Point'),
        coordinates: Joi.array().length(2).items(Joi.number())
          .example([4.884707950517225, 52.37502141913572]),
      }).required(),
    }),
    Joi.object().keys({
      type: Joi.string().valid('edge').required(),
      hashId: Joi.string().required(),
      geometry: [
        Joi.object().keys({
          type: Joi.string().valid('LineString').required(),
          coordinates: Joi.array().min(2).max(5000)
            .items(Joi.array().length(2).items(Joi.number()).description('[lon, lat] in WGS84'))
            .required(),
        }).required(),
        Joi.object().keys({
          type: Joi.string().valid('MultiLineString').required(),
          coordinates: Joi.array().min(1).max(500)
            .items(Joi.array().min(2).max(5000)
              .items(Joi.array().length(2).items(Joi.number()).description('[lon, lat] in WGS84')))
            .required(),
        }).required(),
      ],
    }),
  )).required(),
  right: { environment: 'STATIC' },
  description: 'Updates the geoemtries of one or more nodes, pin groups and or edges',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
