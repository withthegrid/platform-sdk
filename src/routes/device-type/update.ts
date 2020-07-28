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
    channels?: {
      name: string;
      pinFieldConfigurations: UpdatableFieldConfiguration[];
      defaultPinName?: string;
    }[];
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
    channels: Joi.array().items(Joi.object().keys({
      name: Joi.string().required().example('Red wire').description('This name is also visible in environments. To get a uniform user experience, please provide the name in English'),
      pinFieldConfigurations: Joi.array().items(updatableFieldConfigurationSchema).required()
        .description('Defines deviceFields on the pin the channel is connected to. Can be used in report type functions. See the chapter on open fields on how to use this'),
      defaultPinName: Joi.string().example('Anode').description('If undefined, the channel cannot be linked to a pin'),
    })).description('All measurements are registered on a channel. When a device is installed at a pinGroup, its channels are connected to the pins of the pinGroup. Be careful when altering channels that it does still make sense for already installed devices and historic measurement reports. It is therefore not allowed to delete channels (therefore it is required that the array is not shorter than the existing channel array).'),
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
