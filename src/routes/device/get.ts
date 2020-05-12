import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

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
  pinGroup: PinGroup | null;
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
