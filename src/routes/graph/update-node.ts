import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { fieldsSchema, Fields } from '../../models/field-configuration';


interface Request {
  params: {
    hashId: string;
  };
  body: {
    geometry?: {
      type: 'Point';
      coordinates: [number, number];
    };
    fields?: Fields;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/node/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('qp111a'),
  }).required(),
  body: Joi.object().keys({
    geometry: Joi.object().keys({
      type: Joi.string().valid('Point').required(),
      coordinates: Joi.array().length(2).items(Joi.number())
        .description('[lon, lat] in WGS84'),
    }).example({
      type: 'Point',
      coordinates: [4.884707950517225, 52.37502141913572],
    }),
    fields: fieldsSchema,
  }).required(),
  right: { environment: 'STATIC' },
  description: 'Updates a specific node',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
