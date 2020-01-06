import Joi from '@hapi/joi';

import { schema as fieldConfigurationSchema, FieldConfiguration } from './field-configuration';


const schema = Joi.object().keys({
  hashId: Joi.string().required().example('f1a4w1'),
  name: Joi.string().required().example('My environment'),
  mapLayers: Joi.array().items(Joi.object().keys({
    name: Joi.string().required().example('My map layer'),
    key: Joi.string().invalid('nodes').required().example('myLayer'),
  })).min(1).required(),
  fieldConfigurations: Joi.object().keys({
    pinGroups: Joi.array().items(fieldConfigurationSchema).required(),
    edges: Joi.array().items(fieldConfigurationSchema).required(),
    grids: Joi.array().items(fieldConfigurationSchema).required(),
    nodes: Joi.array().items(fieldConfigurationSchema).required(),
    pins: Joi.array().items(fieldConfigurationSchema).required(),
  }).required().description('See the chapter on open fields on how to use this'),
  locale: Joi.string().required().example('en'),
  expiresAt: Joi.date().allow(null).required().example(null),
  createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
})
  .tag('environment')
  .description('The space on which all data like geographical objects, measurements and issues are stored. Multiple users can be given access to the same environment.');

interface Environment {
  hashId: string;
  name: string;
  mapLayers: { name: string; key: string }[];
  fieldConfigurations: {
    pinGroups: FieldConfiguration[];
    edges: FieldConfiguration[];
    grids: FieldConfiguration[];
    nodes: FieldConfiguration[];
    pins: FieldConfiguration[];
  };
  locale: string;
  createdAt: Date;
}

export { schema, Environment };
