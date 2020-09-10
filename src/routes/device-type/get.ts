import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as deviceTypeSchema, DeviceType } from '../../models/device-type';
import { schema as commandTypeSchema, CommandType } from '../../models/command-type';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  deviceType: DeviceType;
  eventHandler: string;
  commandTypes: CommandType[];
  subscriptionHashId?: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('wasd2'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    deviceType: deviceTypeSchema.required(),
    eventHandler: Joi.string().required().example('[omitted]').description('A javascript function that handles an events. See the chapter "User defined code"'),
    commandTypes: Joi.array().items(commandTypeSchema).required(),
    subscriptionHashId: Joi.string().description('If the user is subscribed to (email) alerts on this object, this key is present'),
  }).required(),
  description: 'Get a specific device type identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
