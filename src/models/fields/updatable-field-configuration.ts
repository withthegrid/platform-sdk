import Joi from '@hapi/joi';
import { schema as fieldConfigurationToServerSchema, FieldConfigurationToServer } from './field-configuration-to-server';

interface UpdatableFieldConfiguration {
  existingKey?: string;
  fieldConfiguration: FieldConfigurationToServer;
}

const schema = Joi.object().keys({
  existingKey: Joi.string().pattern(/^[a-z][a-zA-Z\d]*$/),
  fieldConfiguration: fieldConfigurationToServerSchema.required(),
})
  .tag('updatableFieldConfiguration')
  .description('How form field configurations should be sent to the server when updating them.');

export {
  schema,
  UpdatableFieldConfiguration,
};
