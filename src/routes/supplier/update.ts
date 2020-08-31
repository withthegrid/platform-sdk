import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  body: {
    name?: string;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'put',
  path: '/',
  body: Joi.object().keys({
    name: Joi.string().example('My connectivity environment'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
