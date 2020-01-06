import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as environmentSchema, Environment } from '../../models/environment';
import { schema as deviceSchema, Device } from '../../models/device';
import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';
import { schema as deviceSoftwareVersionSchema, DeviceSoftwareVersion } from '../../models/device-software-version';
import { schema as deviceMobileIdentitySchema, DeviceMobileIdentity } from '../../models/device-mobile-identity';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  device: Device;
  environment: Environment | null;
  pinGroup: PinGroup | null;
  softwareVersion: DeviceSoftwareVersion | null;
  mobileIdentity: DeviceMobileIdentity | null;
}


const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('j1iha9'),
  }).required(),
  right: 'READ',
  response: Joi.object().keys({
    device: deviceSchema.required(),
    environment: environmentSchema.allow(null).required(),
    pinGroup: pinGroupSchema.allow(null).required(),
    softwareVersion: deviceSoftwareVersionSchema.allow(null).required(),
    mobileIdentity: deviceMobileIdentitySchema.allow(null).required(),
  }),
  description: 'Get a specific device identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
