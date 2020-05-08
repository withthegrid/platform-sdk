import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    supplierOnly?: boolean;
    encoder?: string | null;
    decoder?: string | null;
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
    encoder: Joi.string().allow(null).description('A javascript function that encodes the field values to a settings object. If null, fields will be used. See [add link]'),
    decoder: Joi.string().allow(null).description('A javascript function that decodes a settings object into field values. If null, settings will be used. See [add link]'),
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
