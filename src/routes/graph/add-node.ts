import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { schema as fieldsToServerFullSchema, FieldsToServerFull } from '../../models/fields/fields-to-server-full';

import { schema as nodeSchema, Node } from '../../models/node';

interface Request {
  body: {
    geometry: {
      type: 'Point';
      coordinates: [number, number];
    };
    fields: FieldsToServerFull;
  };
}

interface Response {
  hashId: string;
  node: Node;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/node',
  body: Joi.object().keys({
    geometry: Joi.object().keys({
      type: Joi.string().valid('Point').required().example('Point'),
      coordinates: Joi.array().length(2).items(Joi.number())
        .description('[lon, lat] in WGS84')
        .example([4.884707950517225, 52.37502141913572]),
    }).required(),
    fields: fieldsToServerFullSchema.required().example({ id: 'My node' }),
  }).required(),
  right: { environment: 'STATIC' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('qp111a'),
    node: nodeSchema.required(),
  }).required(),
  description: 'Create a node',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
