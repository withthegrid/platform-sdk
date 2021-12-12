import Joi from 'joi';

import { schema as baseFieldConfigurationSchema, BaseFieldConfiguration } from './fields/base-field-configuration';
import { Locale, schema as localeSchema } from './locale';
import { MapLayer, schema as mapLayerSchema } from './map-layer';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('f1a4w1'),
  name: Joi.string().required().example('My monitoring environment'),
  mapLayers: Joi.array().items(mapLayerSchema).min(1).required(),
  boundingBox: Joi.object().keys({
    type: Joi.string().valid('LineString').required().example('LineString'),
    coordinates: Joi.array().length(2).items(Joi.array().length(2).items(Joi.number())).required()
      .example([[3.3135576, 47.9747658], [5.1288442202798, 51.8145997]]),
  }).allow(null)
    .required()
    .description('All pin groups and edges in this monitoring environment are contained in the rectangle described by this linestring. If null, no locations (pinGroups) or lines (edges) are present'),
  fieldConfigurations: Joi.object().keys({
    pinGroups: Joi.array().items(baseFieldConfigurationSchema).required(),
    edges: Joi.array().items(baseFieldConfigurationSchema).required(),
    grids: Joi.array().items(baseFieldConfigurationSchema).required(),
    nodes: Joi.array().items(baseFieldConfigurationSchema).required(),
    pins: Joi.array().items(baseFieldConfigurationSchema).required(),
  }).required().description('See the chapter on open fields on how to use this'),
  locale: localeSchema.required().example('en'),
  defaultGraphRange: Joi.string().required().example('30d'),
  measurementsExpirationPeriod: Joi.string().regex(/^[0-9]+ (day|week|month|year)$/).required(),
  expiresAt: Joi.date().allow(null).required().example(null),
  createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
})
  .tag('environment')
  .description('Is called a monitoring environment in the UI. The space on which all data like geographical objects, measurements and issues are stored. Multiple users can be given access to the same monitoring environment.');

interface Environment {
  hashId: string;
  name: string;
  mapLayers: MapLayer[];
  boundingBox: {
    type: 'LineString';
    coordinates: [[number, number], [number, number]];
  } | null;
  fieldConfigurations: {
    pinGroups: BaseFieldConfiguration[];
    edges: BaseFieldConfiguration[];
    grids: BaseFieldConfiguration[];
    nodes: BaseFieldConfiguration[];
    pins: BaseFieldConfiguration[];
  };
  locale: Locale;
  defaultGraphRange: string;
  measurementsExpirationPeriod: string;
  expiresAt: Date | null;
  createdAt: Date;
}

export { schema, Environment };
