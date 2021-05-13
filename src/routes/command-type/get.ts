import Joi from 'joi';
import { ControllerGeneratorOptionsWithClientAndSupplier } from '../../comms/controller';

import { schema as commandTypeSchema, CommandType } from '../../models/command-type';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  commandType: CommandType;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClientAndSupplier = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('x18a92'),
  }).required(),
  right: { environment: 'READ', supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    commandType: commandTypeSchema.required(),
  }).required(),
  description: 'Get a specific command type identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
