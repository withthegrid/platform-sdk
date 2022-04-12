import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { schema as fieldsToServerUpdateSchema, FieldsToServerUpdate } from '../../models/fields/fields-to-server-update';

import { schema as nodeSchema, Node } from '../../models/node';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    geometry?: {
      type: 'Point';
      coordinates: [number, number];
    };
    fields?: FieldsToServerUpdate;
  };
}

interface Response {
  node: Node;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/node/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('qp111a'),
  }).required(),
  body: Joi.object().keys({
    geometry: Joi.object().keys({
      type: Joi.string().valid('Point').required(),
      coordinates: Joi.array().length(2).items(
        Joi.number().min(-180).max(180).required(),
        Joi.number().min(-90).max(90).required(),
      )
        .description('[lon, lat] in WGS84'),
    }).example({
      type: 'Point',
      coordinates: [4.884707950517225, 52.37502141913572],
    }),
    fields: fieldsToServerUpdateSchema,
  }).required(),
  response: Joi.object().keys({
    node: nodeSchema.required(),
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
