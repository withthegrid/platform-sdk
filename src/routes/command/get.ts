import Joi from 'joi';
import { ControllerGeneratorOptionsWithClientAndSupplier } from '../../comms/controller';

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
  createdByUserName?: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClientAndSupplier = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('ga9741s'),
  }).required(),
  right: { environment: 'READ', supplier: 'ENVIRONMENT_ADMIN' },
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    command: commandSchema.required(),
    commandType: commandTypeSchema(apiVersion).required(),
    createdByUserName: Joi.string().example('John Doe'),
  }).required(),
  description: 'Get a specific command identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
