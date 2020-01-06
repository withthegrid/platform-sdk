import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  params: {
    pinHashId: string;
    edgeHashId: string;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'delete',
  path: '/pin/:pinHashId/edge/:edgeHashId',
  params: Joi.object().keys({
    pinHashId: Joi.string().required().example('e13d57'),
    edgeHashId: Joi.string().required().example('ka08d'),
  }).required(),
  right: 'STATIC',
  description: 'Disconnect an edge from a pin. Measurements on the pin (also historic ones) will not be accessible anymore from the edge.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
