import Joi from '@hapi/joi';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('op09a'),
  userHashId: Joi.string().allow(null).required().example('b45zo0'),
  objectType: Joi.string().allow(null).required().example('command'),
  objectHashId: Joi.string().allow(null).required().example('ga9741s'),
  subObjectType: Joi.string().allow(null).required().example(null),
  subObjectHashId: Joi.string().allow(null).required().example(null),
  action: Joi.string().max(32).required().example('delete'),
  diff: Joi.object().keys({
    old: Joi.any(),
    new: Joi.any(),
  }).allow(null)
    .required()
    .example(null),
  createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
})
  .tag('log')
  .description('An entry in the audit log');


interface Log {
  hashId: string;
  userHashId: string | null;
  objectType: string | null;
  objectHashId: string | null;
  subObjectType: string | null;
  subObjectHashId: string | null;
  action: string;
  diff: {
    old: any;
    new: any;
  } | null;
  createdAt: Date;
}

export { schema, Log };
