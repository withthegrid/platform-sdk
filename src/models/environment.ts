import Joi from 'joi';

import { schema as fieldConfigurationsFromServerSchema, FieldConfigurationsFromServer } from './fields/field-configurations-from-server';

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
    pinGroups: fieldConfigurationsFromServerSchema.required(),
    edges: fieldConfigurationsFromServerSchema.required(),
    grids: fieldConfigurationsFromServerSchema.required(),
    nodes: fieldConfigurationsFromServerSchema.required(),
    pins: fieldConfigurationsFromServerSchema.required(),
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
    pinGroups: FieldConfigurationsFromServer;
    edges: FieldConfigurationsFromServer;
    grids: FieldConfigurationsFromServer;
    nodes: FieldConfigurationsFromServer;
    pins: FieldConfigurationsFromServer;
  };
  locale: string;
  expiresAt: Date | null;
  createdAt: Date;
}

export { schema, Environment };
