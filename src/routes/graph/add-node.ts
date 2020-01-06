import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';


interface Request {
  body: {
    geometry: {
      type: 'Point';
      coordinates: [number, number];
    };
    fields: Record<string, string>;
  };
}

interface Response {
  hashId: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/node',
  body: Joi.object().keys({
    geometry: Joi.object().keys({
      type: Joi.string().valid('Point').required().example('Point'),
      coordinates: Joi.array().length(2).items(Joi.number())
        .description('[lon, lat] in WGS84')
        .example([4.884707950517225, 52.37502141913572]),
    }).required(),
    fields: Joi.object().required().example({ id: 'My node' }),
  }).required(),
  right: 'STATIC',
  response: Joi.object().keys({
    hashId: Joi.string().required().example('qp111a'),
  }).required(),
  description: 'Create a node',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
