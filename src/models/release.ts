import Joi from 'joi';

const schema = Joi.object().keys({
  source: Joi.string().valid('client', 'server').example('server'),
  version: Joi.string().required().example('7.1.3'),
  createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
  description: Joi.array().items(Joi.string().example('Fixed a bug in the response of ...')).required(),
})
  .description('Contains information about a GUI or server release of the withthegrid application')
  .tag('release');

interface Release {
  source: 'client' | 'server';
  version: string;
  createdAt: Date;
  description: string[];
}

export { schema, Release };
