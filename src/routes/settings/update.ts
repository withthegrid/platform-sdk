import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  body: {
    name?: string;
    password?: string;
    locale?: string;
    timezone?: string;
    phone?: string | null;
    company?: string | null;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    name: Joi.string().example('Jane Doe'),
    password: Joi.string(),
    locale: Joi.string().valid('en', 'nl'),
    timezone: Joi.string(),
    phone: Joi.string().allow(null),
    company: Joi.string().allow(null),
  }).required(),
  right: {},
  description: 'Update the settings of this user',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
