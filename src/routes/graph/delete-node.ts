import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  params: {
    hashId: string;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'delete',
  path: '/node/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('qp111a'),
  }).required(),
  right: 'STATIC',
  description: 'Delete a node.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
