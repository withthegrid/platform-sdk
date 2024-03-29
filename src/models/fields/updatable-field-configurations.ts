import Joi from 'joi';
import { schema as baseFieldConfigurationSchema, BaseFieldConfiguration } from './base-field-configuration';

type UpdatableFieldConfigurations = {
  existingKey?: string;
  fieldConfiguration: BaseFieldConfiguration;
}[];

const schema = (apiVersion: number): Joi.ArraySchema => Joi.array().items(Joi.object().keys({
  existingKey: Joi.string().pattern(/^[a-z][a-zA-Z\d]*$/),
  fieldConfiguration: baseFieldConfigurationSchema(apiVersion).required(),
}))
  .tag('updatableFieldConfigurations')
  .meta({ className: 'updatableFieldConfigurations' })
  .description('How form field configurations should be sent to the server when updating them.');

export {
  schema,
  UpdatableFieldConfigurations,
};
