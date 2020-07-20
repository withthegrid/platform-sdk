import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as deviceSchema, Device } from '../../models/device';
import { schema as deviceTypeSchema, DeviceType } from '../../models/device-type';

import { schema as handleCommandDueSchema, HandleCommandDue } from '../../models/supplier-activities/handle-command-due';
import { schema as handleDeletedCommandSchema, HandleDeletedCommand } from '../../models/supplier-activities/handle-deleted-command';
import { schema as handleIncomingRequestSchema, HandleIncomingRequest } from '../../models/supplier-activities/handle-incoming-request';
import { schema as handleLinkUpdateSchema, HandleLinkUpdate } from '../../models/supplier-activities/handle-link-update';
import { schema as handleLinkSchema, HandleLink } from '../../models/supplier-activities/handle-link';
import { schema as handleNewCommandSchema, HandleNewCommand } from '../../models/supplier-activities/handle-new-command';
import { schema as handleUnlinkSchema, HandleUnlink } from '../../models/supplier-activities/handle-unlink';

interface Request {
  params: {
    hashId: string;
  };
}

type Response = {
  device: Device | null;
  deviceType: DeviceType | null;
  activity: HandleCommandDue
  | HandleDeletedCommand
  | HandleIncomingRequest
  | HandleLinkUpdate
  | HandleLink
  | HandleNewCommand
  | HandleUnlink;
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
    activity: Joi.alternatives().try(
      handleCommandDueSchema(apiVersion),
      handleDeletedCommandSchema(apiVersion),
      handleIncomingRequestSchema(apiVersion),
      handleLinkUpdateSchema(apiVersion),
      handleLinkSchema(apiVersion),
      handleNewCommandSchema(apiVersion),
      handleUnlinkSchema(apiVersion),
    ).required(),
  }).required(),
  description: 'Get a specific supplier activity identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
