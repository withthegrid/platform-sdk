import Joi from 'joi';
import { schema as fieldConfigurationsFromServerSchema, FieldConfigurationsFromServer } from './fields/field-configurations-from-server';

const baseSchema = Joi.object().keys({
  hashId: Joi.string().required().example('wasd2'),
  name: Joi.string().required().example('Cathodic protection sensor'),
  fieldConfigurations: fieldConfigurationsFromServerSchema.required()
    .description('See the chapter on open fields on how to use this'),
  pinGroupFieldConfigurations: fieldConfigurationsFromServerSchema.required()
    .description('Defines deviceFields on the pinGroup the device is connected to. Can be used in report type functions. See the chapter on open fields on how to use this'),
  channels: Joi.array().items(Joi.object().keys({
    name: Joi.string().required().example('Red wire'),
    pinFieldConfigurations: fieldConfigurationsFromServerSchema.required()
      .description('Defines deviceFields on the pin the channel is connected to. Can be used in report type functions. See the chapter on open fields on how to use this'),
    defaultPinName: Joi.string().example('Anode').description('If undefined, the channel cannot be linked to a pin'),
  })).required(),
  commandTypeHashIds: Joi.array().items(Joi.string().example('x18a92')).required().description('The hashIds of the command types a user can schedule for this device'),
});

const schema = baseSchema
  .tag('deviceType')
  .description('Information about the type of device');

interface DeviceType {
  hashId: string;
  name: string;
  fieldConfigurations: FieldConfigurationsFromServer;
  pinGroupFieldConfigurations: FieldConfigurationsFromServer;
  channels: {
    name: string;
    pinFieldConfigurations: FieldConfigurationsFromServer;
    defaultPinName?: string;
  }[];
  commandTypeHashIds: string[];
}

export {
  schema, baseSchema, DeviceType,
};
