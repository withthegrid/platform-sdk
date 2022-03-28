import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';
import { Locale, schema as localeSchema } from '../../models/locale';

interface Request {
  body: {
    name?: string;
    password?: string;
    locale?: Locale;
    timezone?: string;
    phone?: string | null;
    company?: string | null;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    name: Joi.string().max(255).example('Jane Doe'),
    password: Joi.string().min(8),
    locale: localeSchema,
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
