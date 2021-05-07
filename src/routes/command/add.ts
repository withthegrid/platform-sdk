import Joi from 'joi';
import { ControllerGeneratorOptionsWithClientAndSupplier } from '../../comms/controller';
import { schema as fieldsToServerFullSchema, FieldsToServerFull } from '../../models/fields/fields-to-server-full';

interface Request {
  body: {
    objectType: 'device' | 'pinGroup';
    objectHashIds: string[];
    commandTypeHashId: string;
    fields: FieldsToServerFull;
    startAt: Date | null;
    delay: number;
    endAt: Date | null;
    channelIndices: number[];
    email: string[];
  };
}

type EffectiveRequest = {
  body: Required<Request['body']>;
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClientAndSupplier = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    objectType: Joi.string().valid('device', 'pinGroup').required().example('device'),
    objectHashIds: Joi.array().items(Joi.string().example('j1iha9')).min(1).required(),
    commandTypeHashId: Joi.string().required().example('x18a92'),
    fields: fieldsToServerFullSchema.required().example({ interval: 86400 }),
    startAt: Joi.date().allow(null).default(null).example('2019-12-31T15:23Z')
      .description('Timestamp the device should execute the command. The system tries to share the command with the device before that time. If null, the device should execute it at time of receival + command.delay. It depends on the commandType whether startAt can be null'),
    delay: Joi.number().default(0).description('In seconds. Only relevant when startAt is null. The command should then be executed by the device at time of receival + delay'),
    endAt: Joi.date().allow(null).default(null).example(null)
      .description('Timestamp the device should stop execution of the command.'),
    channelIndices: Joi.array().items(Joi.number()).default([]).description('The device channels for which this command is relevant. See commandType.channelSelect for allowed values.'),
    email: Joi.array().items(Joi.string().email({ tlds: false })).required().example([])
      .description('An email will be sent to all provided email addresses when the command is executed by the device'),
  }).required(),
  right: { environment: 'SENSORS', supplier: 'ENVIRONMENT_ADMIN' },
  description: 'Add a command that should be sent to a specific device',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
