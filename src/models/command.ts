import Joi from '@hapi/joi';
import { fieldsSchema, Fields } from './field-configuration';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('ga9741s'),
  deviceHashId: Joi.string().required().example('j1iha9'),
  commandTypeHashId: Joi.string().required().example('x18a92'),
  fields: fieldsSchema.allow(null).required().example({}).description('Will always null when queried from supplier'),
  pinGroupHashId: Joi.string().required().allow(null).example('dao97'),
  userHashId: Joi.string().allow(null).required().example('b45zo0'),
  startAt: Joi.date().allow(null).required().example('2019-12-31T15:23Z')
    .description('Timestamp the device should execute the command. The system tries to share the command with the device before that time. If null, the device should execute it at time of receival + command.delay'),
  delay: Joi.number().required().example(0).description('In seconds. Only relevant when startAt is null. The command should then be executed by the device at time of receival + delay'),
  endAt: Joi.date().allow(null).required().example(null)
    .description('Timestamp the device should stop execution of the command.'),
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
  commandTypeHashId: string;
  fields: Fields | null;
  pinGroupHashId: string | null;
  userHashId: string | null;
  startAt: Date | null;
  delay: number;
  endAt: Date | null;
  email: string[] | null;
  createdAt?: Date;
  deletedAt?: Date | null;
  sentAt: Date | null;
}

export { schema, Command };
