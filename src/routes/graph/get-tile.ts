import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  params: {
    x: number;
    y: number;
    z: number;
  };
  query: {
    mapLayers?: string[];
  };
}

type EffectiveRequest = {
  params: Required<Request['params']>;
  query: Required<Request['query']>;
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/tiles/:z/:x/:y',
  params: Joi.object().keys({
    z: Joi.number().integer().required().example(13),
    x: Joi.number().integer().required().example(4207),
    y: Joi.number().integer().required().example(2693),
  }).required(),
  query: Joi.object().keys({
    mapLayers: Joi.array().items(Joi.string()).default(['default']),
  }).default(),
  right: { environment: 'READ' },
  response: Joi.any().required().description('A protobuf encoded mapbox vector tile'),
  description: 'Get a mapbox vector tile of the edges, nodes and pin groups within the provided bounding box.',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
