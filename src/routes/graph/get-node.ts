import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as edgeSchema, Edge } from '../../models/edge';
import { schema as nodeSchema, Node } from '../../models/node';
import { schema as fileFromServerSchema, FileFromServer } from '../../models/file-from-server';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  node: Node;
  edges: Edge[];
  files: FileFromServer[];
}


const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/node/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('qp111a'),
  }).required(),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    node: nodeSchema.required(),
    edges: Joi.array().items(edgeSchema).required(),
    files: Joi.array().items(fileFromServerSchema).required(),
  }).required(),
  description: 'Get a specific node identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
