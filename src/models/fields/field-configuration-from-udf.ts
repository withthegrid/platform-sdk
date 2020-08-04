import Joi from '@hapi/joi';

import { schema as baseFieldSchema, BaseField } from './base-field';
import { schema as baseFieldConfigurationSchema, BaseFieldConfiguration } from './base-field-configuration';

const schema = baseFieldConfigurationSchema.keys({
  error: Joi.string().description('Will be displayed along the form field. If provided for any field, form will not be stored.'),
  initialValue: baseFieldSchema.description('Used when loading the form. Maps stored value to form field value. Ignored for \'file\' and \'files\' inputTypes'),
})
  .tag('fieldConfigurationFromUdf')
  .description('Defines which data can be stored in form fields and how that configuration should be sent to the server.');

interface FieldConfigurationFromUdf extends BaseFieldConfiguration {
  error?: string;
  initialValue?: BaseField;
}

export {
  schema,
  FieldConfigurationFromUdf,
};
