import Joi from 'joi';
import { ControllerGeneratorOptionsWithSupplier } from '../../comms/controller';
import { schema as baseFieldConfigurationSchema, BaseFieldConfiguration } from '../../models/fields/base-field-configuration';

interface Request {
  body: {
    name: string;
    eventHandler: string;
    fieldConfigurations: BaseFieldConfiguration[];
    pinGroupFieldConfigurations: BaseFieldConfiguration[];
    channels: {
      name: string;
      pinFieldConfigurations: BaseFieldConfiguration[];
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
    commandTypeHashIds: string[];
  };
}

interface Response {
  hashId: string;
  subscriptionHashId?: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithSupplier = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    name: Joi.string().required().example('Cathodic protection device').description('This name is also visible in monitoring environments. To get a uniform user experience, please provide the name in English'),
    eventHandler: Joi.string().required().example('[omitted]').description('A javascript function that handles events. See the chapter "User defined code'),
    fieldConfigurations: Joi.array().items(baseFieldConfigurationSchema).required()
      .description('See the chapter on open fields on how to use this'),
    pinGroupFieldConfigurations: Joi.array().items(baseFieldConfigurationSchema).required()
      .description('Defines deviceFields on the location (pinGroup) the device is connected to. Can be used in report type functions. See the chapter on open fields on how to use this'),
    channels: Joi.array().items(Joi.object().keys({
      name: Joi.string().required().example('Red wire').description('This name is also visible in monitoring environments. To get a uniform user experience, please provide the name in English'),
      pinFieldConfigurations: Joi.array().items(baseFieldConfigurationSchema).required()
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
    })).required().description('All measurements are registered on a channel. When a device is installed at a location (pinGroup), its channels are connected to the ports (pins) of the location(pinGroup).'),
    charts: Joi.array().items(Joi.object().keys({
      title: Joi.string().allow(null).example('Cathodic protection charts').required(),
      series: Joi.array().items(Joi.object().keys({
        channelIndex: Joi.number().integer().required(),
        quantityHashId: Joi.string().example('x18a92').required(),
        color: Joi.string().example('#ff00ff').allow(null)
          .default(null),
      })).required(),
    })),
    commandTypeHashIds: Joi.array().items(Joi.string().example('x18a92')).required().description('The hashIds of the command types a user can schedule for this device'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('wasd2'),
    subscriptionHashId: Joi.string().description('Right now the user gets automatically subscribed to alerts on this object. This hashId can be used to remove such an alert'),
  }).required(),
  description: 'Add a new device type.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
