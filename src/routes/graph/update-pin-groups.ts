import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

interface Request {
  body: {
    hashIds: string[];
    mapLayer?: {
      key: string,
      includeEdges?: boolean,
    };
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/update-pin-groups/:hashId',
  body: Joi.object().keys({
    hashIds: Joi.array().items(Joi.string()).required(),
    mapLayer: Joi.object().keys({
      key: Joi.string().invalid('nodes'),
      includeEdges: Joi.boolean(),
    }),
  }).required(),
  right: { environment: 'STATIC' },
  description: 'Updates pin groups',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
