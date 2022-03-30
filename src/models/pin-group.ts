import Joi from 'joi';
import { schema as fieldsFromServerSchema, FieldsFromServer } from './fields/fields-from-server';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('dao97'),
  geometry: Joi.object().keys({
    type: Joi.string().valid('Point').required().example('Point'),
    coordinates: Joi.array().length(2).items(Joi.number())
      .description('[lon, lat] in WGS84')
      .example([4.884707950517225, 52.37502141913572]),
  }).allow(null).required(),
  name: Joi.string().required().example('My location'),
  symbolKey: Joi.string().required().example('cp-pole'),
  deviceFields: fieldsFromServerSchema.required().example({})
    .description('The field configuration is stored in the pinGroupFieldConfigurations key of the device type object'),
  fields: fieldsFromServerSchema.required().example({ id: 'My location' })
    .description('The field configuration is stored in the fieldConfigurations key of the monitoring environment object'),
  deviceLinkHashId: Joi.string().allow(null).required()
    .description('If null, there is no device installed at this location')
    .example(null),
  level: Joi.number().integer().valid(0, 1, 2).required()
    .description('0: no serious or critical open issues, 1: one or more serious open issues an no critical open issues, 2: one or more critical open issues')
    .example(0),
  mapLayer: Joi.string().invalid('nodes').required().example('myLayer'),
  mostRecentMeasurementAt: Joi.date().allow(null).required().example(null),
  deletedAt: Joi.date().allow(null).required().example(null),
})
  .description('A collection of pins. Is called a "location" in the GUI. A device can be connected to a pin group. Condition reports are registered at pin group level.')
  .tag('pinGroup')
  .meta({ className: 'pinGroup' });

interface PinGroup {
  hashId: string;
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  } | null;
  name: string;
  symbolKey: string;
  deviceFields: FieldsFromServer;
  fields: FieldsFromServer;
  deviceLinkHashId: string | null;
  level: 0 | 1 | 2;
  mapLayer: string;
  mostRecentMeasurementAt: Date | null;
  deletedAt: Date | null;
}

export { schema, PinGroup };
