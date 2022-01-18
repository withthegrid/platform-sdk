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
    eventHandler?: string;
    fieldConfigurations?: UpdatableFieldConfigurations;
    pinGroupFieldConfigurations?: UpdatableFieldConfigurations;
    channels?: {
      name: string;
      pinFieldConfigurations: UpdatableFieldConfigurations;
      defaultPinName?: string;
      charts?: {
        title: string | null;
        series: {
          quantityHashId: string;
          color: string | null;
        }[];
      }[];
    }[];
    charts?: {
      title: string | null;
      series: {
        channelIndex: number;
        quantityHashId: string;
        color: string | null;
      }[];
    }[];
    commandTypeHashIds?: string[];
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithSupplier = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('wasd2'),
  }).required(),
  body: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    name: Joi.string().example('Cathodic protection device').description('This name is also visible in monitoring environments. To get a uniform user experience, please provide the name in English'),
    eventHandler: Joi.string().description('A javascript function that handles events. See the chapter "User defined code"'),
    fieldConfigurations: updatableFieldConfigurationsSchema(apiVersion),
    pinGroupFieldConfigurations: updatableFieldConfigurationsSchema(apiVersion)
      .description('Defines deviceFields on the location (pinGroup) the device is connected to. Can be used in monitoring report type functions. See the chapter on open fields on how to use this'),
    channels: Joi.array().items(Joi.object().keys({
      name: Joi.string().required().example('Red wire').description('This name is also visible in environments. To get a uniform user experience, please provide the name in English'),
      pinFieldConfigurations: updatableFieldConfigurationsSchema(apiVersion).required()
        .description('Defines deviceFields on the pin the channel is connected to. Can be used in report type functions. See the chapter on open fields on how to use this'),
      defaultPinName: Joi.string().example('Anode').description('If undefined, the channel cannot be linked to a pin'),
      charts: Joi.array().items(Joi.object().keys({
        title: Joi.string().allow(null).example('Red wire charts').required(),
        series: Joi.array().items(Joi.object().keys({
          quantityHashId: Joi.string().example('x18a92').required(),
          color: Joi.string().example('#ff00ff').allow(null)
            .default(null),
        })).required(),
      })),
    })).description('All measurements are registered on a channel. When a device is installed at a location (pinGroup), its channels are connected to the ports (pins) of the location (pinGroup). Be careful when altering channels that it does still make sense for already installed devices and historic condition reports. It is therefore not allowed to delete channels (therefore it is required that the array is not shorter than the existing channel array).'),
    charts: Joi.array().items(Joi.object().keys({
      title: Joi.string().allow(null).example('Cathodic protection charts').required(),
      series: Joi.array().items(Joi.object().keys({
        channelIndex: Joi.number().integer().required(),
        quantityHashId: Joi.string().example('x18a92').required(),
        color: Joi.string().example('#ff00ff').allow(null)
          .default(null),
      })).required(),
    })),
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
