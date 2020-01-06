import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';


interface Request {
  body: {
    fields: Record<string, string>;
    photo?: string;
  };
}

interface Response {
  hashId: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/grid',
  body: Joi.object().keys({
    fields: Joi.object().required().example({ id: 'My grid' }),
    photo: Joi.string().description('Should be a dataurl'),
  }).required(),
  right: 'STATIC',
  response: Joi.object().keys({
    hashId: Joi.string().required().example('naud51'),
  }).required(),
  description: 'Create a pin group grid',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
