import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

interface Request {
  params: {
    pinHashId: string;
  };
  body: {
    edgeHashId: string;
    nodeHashId?: string | null;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/pin/:pinHashId/edge',
  params: Joi.object().keys({
    pinHashId: Joi.string().required().example('e13d57'),
  }).required(),
  body: Joi.object().keys({
    edgeHashId: Joi.string().required().example('ka08d'),
    nodeHashId: Joi.string().allow(null).description('If supplied, should be one of the two endpoints of the provided edge hashId or null. If not supplied, the closest is chosen. Ignored for edges with geometry.type MultiLineString').example(null),
  }).required(),
  right: { environment: 'STATIC' },
  description: 'Connects a pin to an edge. Only measurements from after the connection is made, are accessible on the edge. Pins can be connected to only one edge and edges can be connected to multiple pins.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
