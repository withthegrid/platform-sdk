import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as supplierDeviceTypeSchema, SupplierDeviceType } from '../../models/supplier-device-type';
import { schema as commandTypeSchema, CommandType } from '../../models/command-type';


interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  deviceType: SupplierDeviceType;
  commandTypes: CommandType[];
}


const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('wasd2'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    deviceType: supplierDeviceTypeSchema.required(),
    commandTypes: Joi.array().items(commandTypeSchema).required(),
  }).required(),
  description: 'Get a specific device type identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
