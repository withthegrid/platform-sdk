import Joi from 'joi';
import { Locale } from '../translations';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('b45zo0'),
  email: Joi.string().email({ tlds: false }).allow(null).required()
    .example('info@acme.com')
    .description('Is null for machine accounts'),
  name: Joi.string().required().example('John Doe'),
  timezone: Joi.string().required().example('Europe/Amsterdam').description('A IANA zone or a fixed-offset name of the form \'UTC+3\', or the strings \'utc\'.'),
  locale: Joi.string().valid('nl', 'en').default('en'),
  phone: Joi.string().allow(null).default(null),
  company: Joi.string().allow(null).default(null),
  rights: Joi.array().items(Joi.string()).required().example(['STATIC', 'USERS'])
    .description('See the getting started section about rights'),
})
  .description('A human that has access to the withthegrid application')
  .tag('user');

interface User {
  hashId: string;
  email: string | null;
  name: string;
  timezone: string;
  locale: Locale;
  phone: string | null;
  company: string | null;
  rights: string[];
}

export { schema, User };
