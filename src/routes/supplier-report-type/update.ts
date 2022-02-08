import Joi from 'joi';
import { ControllerGeneratorOptionsWithSupplier } from '../../comms/controller';
import {
  schema as updatableFieldConfigurationsSchema,
  UpdatableFieldConfigurations,
} from '../../models/fields/updatable-field-configurations';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    name?: string;
    fieldConfigurations?: {
      pinGroup?: UpdatableFieldConfigurations;
      pin?: UpdatableFieldConfigurations;
      measurement?: UpdatableFieldConfigurations;
    };
    parser?: string;
    retryFailedSince?: Date;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithSupplier = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('y124as'),
  }).required(),
  body: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    name: Joi.string().example('Temperature'),
    fieldConfigurations: Joi.object().keys({
      pinGroup: updatableFieldConfigurationsSchema(apiVersion),
      pin: updatableFieldConfigurationsSchema(apiVersion),
      measurement: updatableFieldConfigurationsSchema(apiVersion),
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
