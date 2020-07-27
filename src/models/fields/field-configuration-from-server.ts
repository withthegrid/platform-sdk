import Joi from '@hapi/joi';
import { schema as baseFieldConfigurationSchema, BaseFieldConfiguration } from './base-field-configuration';

const schema = baseFieldConfigurationSchema.keys({
  parserJs: Joi.string().description('The JavaScript transpiled version of the TypeScript variant'),
  validatorJs: Joi.string().description('The JavaScript transpiled version of the TypeScript variant'),
  showJs: Joi.string().description('The JavaScript transpiled version of the TypeScript variant'),
  headerJs: Joi.string().description('The JavaScript transpiled version of the TypeScript variant'),
  unparserJs: Joi.string().description('The JavaScript transpiled version of the TypeScript variant'),
})
  .tag('fieldConfigurationFromServer')
  .description('Defines which data can be stored in form fields and how that configuration is retrieved from the server.');

interface FieldConfigurationFromServer extends BaseFieldConfiguration {
  parserJs?: string;
  validatorJs?: string;
  showJs?: string;
  headerJs?: string;
  unparserJs?: string;
}

export {
  schema,
  FieldConfigurationFromServer,
};
