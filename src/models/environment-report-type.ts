import Joi from 'joi';

import { schema as baseFieldConfigurationSchema, BaseFieldConfiguration } from './fields/base-field-configuration';

const schema = (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
  hashId: Joi.string().required().example('l19a7s'),
  name: Joi.string().required().example('Temperature and inclination'),
  fieldConfigurations: Joi.object().keys({
    pinGroup: Joi.array().items(baseFieldConfigurationSchema(apiVersion)).required(),
    pin: Joi.array().items(baseFieldConfigurationSchema(apiVersion)).required(),
    measurement: Joi.array().items(baseFieldConfigurationSchema(apiVersion)).required(),
  }).required()
    .description('See the chapter on open fields on how to use this'),
  type: Joi.string().valid('human', 'device').example('human').required(),
  deletedAt: Joi.date().allow(null).required().example(null),
})
  .description('An object defining what a condition report should look like, used in monitoring environments')
  .tag('environmentReportType')
  .meta({ className: 'environmentReportType' });

interface EnvironmentReportType {
  hashId: string;
  name: string;
  fieldConfigurations: {
    pinGroup: BaseFieldConfiguration[];
    pin: BaseFieldConfiguration[];
    measurement: BaseFieldConfiguration[];
  };
  type: 'human' | 'device';
  deletedAt: Date | null;
}

export { schema, EnvironmentReportType };
