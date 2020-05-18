import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as deviceSchema, Device } from '../../models/device';
import { schema as deviceTypeSchema, DeviceType } from '../../models/device-type';
import { schema as supplierDeviceTypeSchema, SupplierDeviceType } from '../../models/supplier-device-type';
import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';
import { schema as fileFromServerSchema, FileFromServer } from '../../models/file-from-server';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  device: Device;
  deviceType: DeviceType | SupplierDeviceType;
  environmentName: string | null;
  environmentHashId: string | null;
  pinGroup: PinGroup | null;
  files: FileFromServer[];
}


const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('j1iha9'),
  }).required(),
  right: { environment: 'READ', supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    device: deviceSchema.required(),
    deviceType: Joi.alternatives().try(deviceTypeSchema, supplierDeviceTypeSchema).required(),
    environmentName: Joi.string().allow(null).required(),
    environmentHashId: Joi.string().allow(null).required(),
    pinGroup: pinGroupSchema.allow(null).required().description('Will be null when queried from supplier'),
    files: Joi.array().items(fileFromServerSchema).required(),
  }),
  description: 'Get a specific device identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
