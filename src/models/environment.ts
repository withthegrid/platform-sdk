import Joi from '@hapi/joi';

import { schema as fieldConfigurationSchema, FieldConfiguration } from './field-configuration';


const schema = Joi.object().keys({
  hashId: Joi.string().required().example('f1a4w1'),
  name: Joi.string().required().example('My environment'),
  mapLayers: Joi.array().items(Joi.object().keys({
    name: Joi.string().required().example('My map layer'),
    key: Joi.string().invalid('nodes').required().example('myLayer'),
  })).min(1).required(),
  boundingBox: Joi.object().keys({
    type: Joi.string().valid('LineString').required().example('LineString'),
    coordinates: Joi.array().length(2).items(Joi.array().length(2).items(Joi.number())).required()
      .example([[3.3135576, 47.9747658], [5.1288442202798, 51.8145997]]),
  }).allow(null)
    .required()
    .description('All pin groups and edges in this environment are contained in the rectangle described by this linestring. If null, no pinGroups or edges are present'),
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
  boundingBox: {
    type: 'LineString';
    coordinates: [[number, number], [number, number]];
  } | null;
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
