import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    subscribed: boolean;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/:hashId/notifications',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('c19aid'),
  }).required(),
  body: Joi.object().keys({
    subscribed: Joi.boolean().required().example(true),
  }).required(),
  right: 'READ',
  description: 'Subscribe to or unsubscribe from a specific issue',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
