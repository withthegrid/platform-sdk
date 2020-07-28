import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import {
  schema as updatableFieldConfigurationSchema,
  UpdatableFieldConfiguration,
} from '../../models/fields/updatable-field-configuration';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    name?: string;
    fieldConfigurations?: {
      pinGroup?: UpdatableFieldConfiguration[];
      pin?: UpdatableFieldConfiguration[];
      measurement?: UpdatableFieldConfiguration[];
    };
    parser?: string;
    retryFailedSince?: Date;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('y124as'),
  }).required(),
  body: Joi.object().keys({
    name: Joi.string().example('Temperature'),
    fieldConfigurations: Joi.object().keys({
      pinGroup: Joi.array().items(updatableFieldConfigurationSchema),
      pin: Joi.array().items(updatableFieldConfigurationSchema),
      measurement: Joi.array().items(updatableFieldConfigurationSchema),
    }).description('See the chapter on open fields on how to use this'),
    parser: Joi.string().example('[omitted]').description('A javascript function that parses an incoming report. See the chapter "User defined code"'),
    retryFailedSince: Joi.date().description('If supplied, all incoming reports of this type that failed to decode since the provided date will be reparsed.'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  description: 'Update a device report type.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
