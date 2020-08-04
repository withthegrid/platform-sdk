import Joi from '@hapi/joi';
import { schema as baseFieldConfigurationSchema, BaseFieldConfiguration } from './base-field-configuration';

const schema = Joi.alternatives().try(
  Joi.array().items(baseFieldConfigurationSchema).required(),
  Joi.object().keys({
    renderTs: Joi.string().required(),
    renderJs: Joi.string().required(),
  }).required(),
)
  .tag('fieldConfigurationsFromServer')
  .description('Defines which data can be stored in form fields and how that configuration is retrieved from the server.');

type FieldConfigurationsFromServer = BaseFieldConfiguration[]
  | { renderTs: string; renderJs: string };

export {
  schema,
  FieldConfigurationsFromServer,
};
