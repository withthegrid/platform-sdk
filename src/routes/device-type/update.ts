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
    eventHandler?: string;
    fieldConfigurations?: UpdatableFieldConfiguration[];
    pinGroupFieldConfigurations?: UpdatableFieldConfiguration[];
    commandTypeHashIds?: string[];
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('wasd2'),
  }).required(),
  body: Joi.object().keys({
    name: Joi.string().example('Cathodic protection sensor').description('This name is also visible in environments. To get a uniform user experience, please provide the name in English'),
    eventHandler: Joi.string().description('A javascript function that handles events. See the chapter "User defined code"'),
    fieldConfigurations: Joi.array().items(updatableFieldConfigurationSchema),
    pinGroupFieldConfigurations: Joi.array().items(updatableFieldConfigurationSchema)
      .description('Defines deviceFields on the pinGroup the device is connected to. Can be used in report type functions. See the chapter on open fields on how to use this'),
    commandTypeHashIds: Joi.array().items(Joi.string()).description('The hashIds of the command types a user can schedule for this device'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  description: 'Update the settings of a device type.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
