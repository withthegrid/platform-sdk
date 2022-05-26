import Joi from 'joi';
import { Locale, schema as localeSchema } from './locale';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('b45zo0'),
  email: Joi.string().email({ tlds: false }).allow(null).required()
    .example('info@acme.com')
    .description('Is null for machine accounts'),
  name: Joi.string().required().max(255).example('John Doe'),
  timezone: Joi.string().required().example('Europe/Amsterdam').description('A IANA zone or a fixed-offset name of the form \'UTC+3\', or the strings \'utc\'.'),
  locale: localeSchema.default('en'),
  phone: Joi.string().allow(null).default(null),
  company: Joi.string().allow(null).default(null),
  rights: Joi.array().items(Joi.string()).required().example(['STATIC', 'USERS'])
    .description('See the getting started section about rights'),
  isSecretActive: Joi.boolean().allow(null).required().example(true)
    .description('Is true if user has 2FA enabled'),
})
  .description('A human that has access to the withthegrid application')
  .tag('user')
  .meta({ className: 'user' });

interface User {
  hashId: string;
  email: string | null;
  name: string;
  timezone: string;
  locale: Locale;
  phone: string | null;
  company: string | null;
  rights: string[];
  isSecretActive: boolean | null;
}

export { schema, User };
