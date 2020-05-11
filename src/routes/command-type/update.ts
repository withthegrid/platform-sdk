import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    supplierOnly?: boolean;
  };
}


type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('x18a92'),
  }).required(),
  body: Joi.object().keys({
    supplierOnly: Joi.boolean().description('If true, this type of command can not be created from an environment'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  description: 'Update a command type.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
