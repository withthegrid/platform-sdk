import Joi from '@hapi/joi';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('ga9741s'),
  deviceHashId: Joi.string().required().example('j1iha9'),
  deviceTypeKey: Joi.string().required().example('cp-pole'),
  instruction: Joi.string().required().example('default'),
  settings: Joi.object().required().example({}),
  pinGroupHashId: Joi.string().required().allow(null).example('dao97'),
  environmentHashId: Joi.string().required().allow(null).example('f1a4w1'),
  userHashId: Joi.string().allow(null).required().example('b45zo0'),
  startAt: Joi.date().allow(null).required().example('2019-12-31T15:23Z'),
  endAt: Joi.date().allow(null).required().example(null),
  email: Joi.array().items(Joi.string().email({ tlds: false }).example('info@acme.com')).allow(null),
  createdAt: Joi.date(),
  deletedAt: Joi.date().allow(null),
  sentAt: Joi.date().allow(null).required().example('2019-12-31T15:23Z'),
})
  .tag('command')
  .description('An instruction for a specific device');


interface Command {
  hashId: string;
  deviceHashId: string;
  deviceTypeKey: string;
  instruction: string;
  settings: any;
  pinGroupHashId: string | null;
  environmentHashId: string | null;
  userHashId: string | null;
  startAt: Date | null;
  endAt: Date | null;
  email: string[] | null;
  createdAt?: Date;
  deletedAt?: Date | null;
  sentAt: Date | null;
}

export { schema, Command };
