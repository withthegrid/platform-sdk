import Joi from 'joi';
import { ControllerGeneratorOptionsWithSupplier } from '../../comms/controller';

import { schema as deviceSchema, Device } from '../../models/device';
import { schema as deviceTypeSchema, DeviceType } from '../../models/device-type';

import { schema as allActivitiesSchema, AllActivities } from '../../models/supplier-activities/all-activities';

interface Request {
  params: {
    hashId: string;
  };
}

type Response = {
  device: Device | null;
  deviceType: DeviceType | null;
  activity: AllActivities;
};

const controllerGeneratorOptions: ControllerGeneratorOptionsWithSupplier = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('2ad91p'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  response: (apiVersion: number): Joi.AnySchema => Joi.object().keys({
    device: deviceSchema.allow(null).required(),
    deviceType: deviceTypeSchema.allow(null).required(),
    activity: allActivitiesSchema(apiVersion).required(),
  }).required(),
  description: 'Get a specific activity in the connectivity environment',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
