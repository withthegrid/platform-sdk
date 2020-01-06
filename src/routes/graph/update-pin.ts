import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';


interface Request {
  params: {
    hashId: string;
  };
  body: {
    fields: Record<string, string>;
  };
}

interface Response {
  name: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/pin/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('e13d57'),
  }).required(),
  body: Joi.object().keys({
    fields: Joi.object().required().example({ id: 'My connecting point' }),
  }).required(),
  response: Joi.object().keys({
    name: Joi.string().required().example('My connecting point'),
  }).required(),
  right: 'STATIC',
  description: 'Updates a specific pin',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
