import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

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

const controllerGeneratorOptions: ControllerGeneratorOptions = {
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
  description: 'Get a specific supplier activity identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
