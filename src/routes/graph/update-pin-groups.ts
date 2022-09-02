import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

interface Request {
  body: {
    hashIds: string[];
    symbolKey?: string;
    gridHashIds?: string[];
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
    symbolKey: Joi.string().example('cp-rect'),
    mapLayer: Joi.object().keys({
      key: Joi.string().invalid('nodes'),
      includeEdges: Joi.boolean(),
    }),
    gridHashIds: Joi.array().items(Joi.string()).description('PinGroups will be added at the end of the list in a grid'),
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
