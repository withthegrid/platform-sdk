import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import {
  schema as updatableFieldConfigurationsSchema,
  UpdatableFieldConfigurations,
} from '../../models/fields/updatable-field-configurations';

import { schema as environmentSchema, Environment } from '../../models/environment';
import { Locale, schema as localeSchema } from '../../models/locale';
import { MapLayer, schema as mapLayerSchema } from '../../models/map-layer';

interface Request {
  body: {
    name?: string;
    mapLayers?: MapLayer[];
    fieldConfigurations?: {
      pinGroups: UpdatableFieldConfigurations;
      edges: UpdatableFieldConfigurations;
      grids: UpdatableFieldConfigurations;
      nodes: UpdatableFieldConfigurations;
      pins: UpdatableFieldConfigurations;
    };
    locale?: Locale;
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
    mapLayers: Joi.array().items(mapLayerSchema).min(1),
    fieldConfigurations: Joi.object().keys({
      pinGroups: fieldConfigurationSchema,
      grids: fieldConfigurationSchema,
      edges: fieldConfigurationSchema,
      nodes: fieldConfigurationSchema,
      pins: fieldConfigurationSchema,
    }).description('See the chapter on open fields on how to use this. A minimum of 1 element should be present in each field configuration array'),
    locale: localeSchema,
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
