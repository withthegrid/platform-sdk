import { schema as baseFieldConfigurationSchema, BaseFieldConfiguration } from './base-field-configuration';

const schema = baseFieldConfigurationSchema
  .tag('fieldConfigurationToServer')
  .description('Defines which data can be stored in form fields and how that configuration should be sent to the server.');

type FieldConfigurationToServer = BaseFieldConfiguration;

export {
  schema,
  FieldConfigurationToServer,
};
