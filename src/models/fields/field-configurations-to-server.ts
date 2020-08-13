import Joi from 'joi';

import { schema as baseFieldConfigurationSchema, BaseFieldConfiguration } from './base-field-configuration';

const schema = Joi.alternatives().try(
  Joi.array().items(baseFieldConfigurationSchema).required(),
  Joi.object().keys({
    renderTs: Joi.string().required(),
  }).required(),
)
  .tag('fieldConfigurationsToServer')
  .description('Defines which data can be stored in form fields and how that configuration should be sent to the server.');

type FieldConfigurationsToServer = BaseFieldConfiguration[] | { renderTs: string };

export {
  schema,
  FieldConfigurationsToServer,
};
