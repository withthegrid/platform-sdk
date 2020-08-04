import Joi from '@hapi/joi';
import { schema as baseFieldConfigurationSchema, BaseFieldConfiguration } from './base-field-configuration';

type UpdatableFieldConfigurations = {
  existingKey?: string;
  fieldConfiguration: BaseFieldConfiguration;
}[] | { renderTs: string };

const schema = Joi.alternatives().try(
  Joi.array().items(Joi.object().keys({
    existingKey: Joi.string().pattern(/^[a-z][a-zA-Z\d]*$/),
    fieldConfiguration: baseFieldConfigurationSchema.required(),
  })).required(),
  Joi.object().keys({
    renderTs: Joi.string().required(),
  }).required(),
)
  .tag('updatableFieldConfigurations')
  .description('How form field configurations should be sent to the server when updating them.');

export {
  schema,
  UpdatableFieldConfigurations,
};
