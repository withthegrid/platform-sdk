import Joi from 'joi';
import { schema as baseFieldConfigurationSchema, BaseFieldConfiguration } from './fields/base-field-configuration';
import {
  stringBeforeV7ElseStringOrTranslationSchema,
  StringOrTranslations,
} from './string-or-translations';

const schema = (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
  hashId: Joi.string().required().example('wasd2'),
  name: stringBeforeV7ElseStringOrTranslationSchema(apiVersion).required().example('Cathodic protection device'),
  fieldConfigurations: Joi.array().items(baseFieldConfigurationSchema(apiVersion)).required()
    .description('See the chapter on open fields on how to use this'),
  pinGroupFieldConfigurations: Joi.array()
    .items(baseFieldConfigurationSchema(apiVersion))
    .required()
    .description('Defines deviceFields on the location (pinGroup) the device is connected to. Can be used in report type functions. See the chapter on open fields on how to use this'),
  channels: Joi.array().items(Joi.object().keys({
    name: stringBeforeV7ElseStringOrTranslationSchema(apiVersion).required().example('Red wire'),
    pinFieldConfigurations: Joi.array().items(baseFieldConfigurationSchema(apiVersion)).required()
      .description('Defines deviceFields on the pin the channel is connected to. Can be used in report type functions. See the chapter on open fields on how to use this'),
    defaultPinName: stringBeforeV7ElseStringOrTranslationSchema(apiVersion).example('Anode').description('If undefined, the channel cannot be linked to a pin'),
    charts: Joi.array().items(Joi.object().keys({
      title: stringBeforeV7ElseStringOrTranslationSchema(apiVersion).required().allow(null).example('Red wire charts'),
      series: Joi.array().items(Joi.object().keys({
        quantityHashId: Joi.string().example('x18a92').required(),
        color: Joi.string().example('#ff00ff').allow(null)
          .default(null),
      })).required(),
    })).required(),
  })).required(),
  charts: Joi.array().items(Joi.object().keys({
    title: stringBeforeV7ElseStringOrTranslationSchema(apiVersion).required().allow(null).example('Cathodic protection charts'),
    series: Joi.array().items(Joi.object().keys({
      channelIndex: Joi.number().integer().example(0).required(),
      quantityHashId: Joi.string().example('x18a92').required(),
      color: Joi.string().example('#ff00ff').allow(null)
        .default(null),
    })).required(),
  })).required(),
  commandTypeHashIds: Joi.array().items(Joi.string().example('x18a92')).required().description('The hashIds of the command types a user can schedule for this device'),
}).tag('deviceType')
  .meta({ className: 'deviceType' })
  .description('Information about the type of device');

interface DeviceType {
  hashId: string;
  name: StringOrTranslations;
  fieldConfigurations: BaseFieldConfiguration[];
  pinGroupFieldConfigurations: BaseFieldConfiguration[];
  channels: {
    name: StringOrTranslations;
    pinFieldConfigurations: BaseFieldConfiguration[];
    defaultPinName?: StringOrTranslations;
    charts: {
      title: StringOrTranslations | null;
      series: {
        quantityHashId: string;
        color: string | null;
      }[];
    }[];
  }[];
  charts: {
    title: StringOrTranslations | null;
    series: {
      channelIndex: number;
      quantityHashId: string;
      color: string | null;
    }[];
  }[];
  commandTypeHashIds: string[];
}

export {
  schema, DeviceType,
};
