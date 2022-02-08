import Joi from 'joi';
import { ControllerGeneratorOptionsWithClientAndSupplier } from '../../comms/controller';

import { schema as deviceSchema, Device } from '../../models/device';
import { schema as deviceTypeSchema, DeviceType } from '../../models/device-type';
import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  device: Device;
  deviceType: DeviceType;
  environmentName: string | null;
  environmentHashId: string | null;
  pinGroup: PinGroup | null;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClientAndSupplier = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('j1iha9'),
  }).required(),
  right: { environment: 'READ', supplier: 'ENVIRONMENT_ADMIN' },
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    device: deviceSchema.required(),
    deviceType: deviceTypeSchema(apiVersion).required(),
    environmentName: Joi.string().allow(null).example('My monitoring environment').required(),
    environmentHashId: Joi.string().allow(null).example('f1a4w1').required(),
    pinGroup: pinGroupSchema.allow(null).required().description('Will be null when queried from supplier'),
  }),
  description: 'Get a specific device identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
