import Joi from 'joi';

import { schema as fieldToFieldConfigurationUdfSchema, FieldToFieldConfigurationUdf } from './field-to-field-configuration-udf';

type FieldsToFieldConfigurationUdf = Record<string, FieldToFieldConfigurationUdf>;

const schema = Joi.object().pattern(
  Joi.string().required(),
  fieldToFieldConfigurationUdfSchema,
)
  .tag('fieldsToFieldConfigurationUdf')
  .description('How form fields are shared with user defined functions.');

export {
  schema,
  FieldsToFieldConfigurationUdf,
};
