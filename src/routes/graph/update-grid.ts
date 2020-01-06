import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';


interface Request {
  params: {
    hashId: string;
  };
  body: {
    fields?: Record<string, string>;
    photo?: string | null;
  };
}

interface Response {
  name: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/grid/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('naud51'),
  }).required(),
  body: Joi.object().keys({
    fields: Joi.object().example({ id: 'My grid' }),
    photo: Joi.string().allow(null).description('Should be a dataurl. Null clears the photo'),
  }).required(),
  response: Joi.object().keys({
    name: Joi.string().required().example('My grid'),
  }).required(),
  right: 'STATIC',
  description: 'Updates a specific grid',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
