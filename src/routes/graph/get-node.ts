import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as edgeSchema, Edge } from '../../models/edge';
import { schema as nodeSchema, Node } from '../../models/node';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  node: Node;
  edges: Edge[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/node/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('qp111a'),
  }).required(),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    node: nodeSchema.required(),
    edges: Joi.array().items(edgeSchema).required(),
  }).required(),
  description: 'Get a specific node identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
