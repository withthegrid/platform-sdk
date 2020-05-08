import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import {
  updatableFieldConfigurationSchema,
  UpdatableFieldConfiguration,
} from '../../models/field-configuration';


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

const fieldConfigurationSchema = updatableFieldConfigurationSchema.description('The first element in the array is not allowed to have fieldConfiguration.valueOptions defined');

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
      pinGroups: Joi.array().items(fieldConfigurationSchema).min(1).required(),
      grids: Joi.array().items(fieldConfigurationSchema).min(1).required(),
      edges: Joi.array().items(fieldConfigurationSchema).min(1).required(),
      nodes: Joi.array().items(fieldConfigurationSchema).min(1).required(),
      pins: Joi.array().items(fieldConfigurationSchema).min(1).required(),
    }).description('See the chapter on open fields on how to use this. A minimum of 1 element should be present in each field configuration array'),
    locale: Joi.string().valid('en', 'nl'),
  }).required(),
  right: { environment: 'ENVIRONMENT_ADMIN' },
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
