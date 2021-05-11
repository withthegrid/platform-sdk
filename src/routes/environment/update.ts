import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import {
  schema as updatableFieldConfigurationsSchema,
  UpdatableFieldConfigurations,
} from '../../models/fields/updatable-field-configurations';

import { schema as environmentSchema, Environment } from '../../models/environment';

interface Request {
  body: {
    name?: string;
    mapLayers?: { name: string; key: string }[];
    fieldConfigurations?: {
      pinGroups: UpdatableFieldConfigurations;
      edges: UpdatableFieldConfigurations;
      grids: UpdatableFieldConfigurations;
      nodes: UpdatableFieldConfigurations;
      pins: UpdatableFieldConfigurations;
    };
    locale?: 'nl' | 'en';
  };
}

interface Response {
  environment: Environment;
}

const fieldConfigurationSchema = updatableFieldConfigurationsSchema.description('If a BaseFieldConfiguration-array is provided, the first element is not allowed to have fieldConfiguration.valueOptions defined').required();

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'put',
  path: '/',
  body: Joi.object().keys({
    name: Joi.string().example('My monitoring environment'),
    mapLayers: Joi.array().items(Joi.object().keys({
      name: Joi.string().required().example('My map layer'),
      key: Joi.string().invalid('nodes').required().example('myLayer'),
    })).min(1),
    fieldConfigurations: Joi.object().keys({
      pinGroups: fieldConfigurationSchema,
      grids: fieldConfigurationSchema,
      edges: fieldConfigurationSchema,
      nodes: fieldConfigurationSchema,
      pins: fieldConfigurationSchema,
    }).description('See the chapter on open fields on how to use this. A minimum of 1 element should be present in each field configuration array'),
    locale: Joi.string().valid('en', 'nl'),
  }).required(),
  right: { environment: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    environment: environmentSchema.required(),
  }).required(),
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
