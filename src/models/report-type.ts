import Joi from '@hapi/joi';

import { schema as fieldConfigurationFromServerSchema, FieldConfigurationFromServer } from './fields/field-configuration-from-server';

const baseSchema = Joi.object().keys({
  hashId: Joi.string().required().example('l19a7s'),
  name: Joi.string().required().example('Temperature and inclination'),
  fieldConfigurations: Joi.object().keys({
    pinGroup: Joi.array().items(fieldConfigurationFromServerSchema).required(),
    pin: Joi.array().items(fieldConfigurationFromServerSchema).required(),
    measurement: Joi.array().items(fieldConfigurationFromServerSchema).required(),
  }).required()
    .description('See the chapter on open fields on how to use this'),
  deletedAt: Joi.date().allow(null).required().example(null),
});

const schema = baseSchema
  .description('An object defining what a measurement report should look like')
  .tag('reportType');

interface ReportType {
  hashId: string;
  name: string;
  fieldConfigurations: {
    pinGroup: FieldConfigurationFromServer[];
    pin: FieldConfigurationFromServer[];
    measurement: FieldConfigurationFromServer[];
  };
  deletedAt: Date | null;
}

export { schema, baseSchema, ReportType };
