import Joi from 'joi';

import { schema as fieldConfigurationsFromServerSchema, FieldConfigurationsFromServer } from './fields/field-configurations-from-server';

const baseSchema = Joi.object().keys({
  hashId: Joi.string().required().example('l19a7s'),
  name: Joi.string().required().example('Temperature and inclination'),
  fieldConfigurations: Joi.object().keys({
    pinGroup: fieldConfigurationsFromServerSchema.required(),
    pin: fieldConfigurationsFromServerSchema.required(),
    measurement: fieldConfigurationsFromServerSchema.required(),
  }).required()
    .description('See the chapter on open fields on how to use this'),
  type: Joi.string().valid('human', 'device').example('human').required(),
  deletedAt: Joi.date().allow(null).required().example(null),
});

const schema = baseSchema
  .description('An object defining what a condition report should look like, used in monitoring environments')
  .tag('environmentReportType');

interface EnvironmentReportType {
  hashId: string;
  name: string;
  fieldConfigurations: {
    pinGroup: FieldConfigurationsFromServer;
    pin: FieldConfigurationsFromServer;
    measurement: FieldConfigurationsFromServer;
  };
  type: 'human' | 'device';
  deletedAt: Date | null;
}

export { schema, baseSchema, EnvironmentReportType };
