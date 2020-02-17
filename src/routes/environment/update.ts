import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { schema as fieldConfigurationSchema, FieldConfiguration } from '../../models/field-configuration';


interface UpdatableFieldConfiguration {
  existingKey?: string;
  fieldConfiguration: FieldConfiguration;
}

interface Request {
  body: {
    name?: string;
    mapLayers?: { name: string; key: string }[];
    fieldConfigurations?: {
      pinGroups: UpdatableFieldConfiguration[];
      edges: UpdatableFieldConfiguration[];
      grids: UpdatableFieldConfiguration[];
      nodes: UpdatableFieldConfiguration[];
      pins: UpdatableFieldConfiguration[];
    };
    locale?: 'nl' | 'en';
  };
}

type Response = void;

const updatableFieldConfigurationSchema = Joi.object().keys({
  existingKey: Joi.string().pattern(/^[a-z][a-zA-Z\d]*$/),
  fieldConfiguration: fieldConfigurationSchema.required(),
}).description('The first element in the array is not allowed to have fieldConfiguration.valueOptions defined');

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'put',
  path: '/',
  body: Joi.object().keys({
    name: Joi.string().example('My environment name'),
    mapLayers: Joi.array().items(Joi.object().keys({
      name: Joi.string().required().example('My map layer'),
      key: Joi.string().invalid('nodes').required().example('myLayer'),
    })).min(1),
    fieldConfigurations: Joi.object().keys({
      pinGroups: Joi.array().items(updatableFieldConfigurationSchema).min(1).required(),
      grids: Joi.array().items(updatableFieldConfigurationSchema).min(1).required(),
      edges: Joi.array().items(updatableFieldConfigurationSchema).min(1).required(),
      nodes: Joi.array().items(updatableFieldConfigurationSchema).min(1).required(),
      pins: Joi.array().items(updatableFieldConfigurationSchema).min(1).required(),
    }).description('See the chapter on open fields on how to use this. A minimum of 1 element should be present in each field configuration array'),
    locale: Joi.string().valid('en', 'nl'),
  }).required(),
  right: 'ENVIRONMENT_ADMIN',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
