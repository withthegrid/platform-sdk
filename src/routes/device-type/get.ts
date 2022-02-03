import Joi from 'joi';
import { ControllerGeneratorOptionsWithSupplier } from '../../comms/controller';

import { schema as deviceTypeSchema, DeviceType } from '../../models/device-type';
import { schema as commandTypeSchema, CommandType } from '../../models/command-type';
import { schema as quantitySchema, Quantity } from '../../models/quantity';

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
  chartQuantities: Quantity[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithSupplier = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('wasd2'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    deviceType: deviceTypeSchema(apiVersion).required(),
    eventHandler: Joi.string().required().example('[omitted]').description('A javascript function that handles an events. See the chapter "User defined code"'),
    commandTypes: Joi.array().items(commandTypeSchema(apiVersion)).required(),
    subscriptionHashId: Joi.string().description('If the user is subscribed to (email) alerts on this object, this key is present'),
    chartQuantities: Joi.array().items(quantitySchema).required(),
  }).required(),
  description: 'Get a specific device type identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
