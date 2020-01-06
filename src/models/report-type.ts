import Joi from '@hapi/joi';

import { schema as fieldConfigurationSchema, FieldConfiguration } from './field-configuration';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('l19a7s'),
  name: Joi.string().required().example('Temperature and inclination'),
  fieldConfigurations: Joi.array().items(fieldConfigurationSchema).required()
    .description('See the chapter on open fields on how to use this'),
  deletedAt: Joi.date().allow(null).required().example(null),
})
  .description('An object defining what a measurement report should look like')
  .tag('reportType');


interface ReportType {
  hashId: string;
  name: string;
  fieldConfigurations: FieldConfiguration[];
  deletedAt: Date | null;
}

export { schema, ReportType };
