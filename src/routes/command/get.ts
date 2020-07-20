import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as commandSchema, Command } from '../../models/command';
import { schema as commandTypeSchema, CommandType } from '../../models/command-type';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  command: Command;
  commandType: CommandType;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('ga9741s'),
  }).required(),
  right: { environment: 'READ', supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    command: commandSchema.required(),
    commandType: commandTypeSchema.required(),
  }).required(),
  description: 'Get a specific command identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
