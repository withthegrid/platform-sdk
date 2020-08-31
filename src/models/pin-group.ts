import Joi from 'joi';
import { schema as fieldsFromServerSchema, FieldsFromServer } from './fields/fields-from-server';

const schema = (apiVersion: number): Joi.ObjectSchema => {
  const model = Joi.object().keys({
    hashId: Joi.string().required().example('dao97'),
    gridHashId: Joi.string().allow(null).required().example('naud51'),
    geometry: Joi.object().keys({
      type: Joi.string().valid('Point').required().example('Point'),
      coordinates: Joi.array().length(2).items(Joi.number())
        .description('[lon, lat] in WGS84')
        .example([4.884707950517225, 52.37502141913572]),
    }).required(),
    name: Joi.string().required().example('My measurement location'),
    symbolKey: Joi.string().required().example('cp-pole'),
    deviceFields: fieldsFromServerSchema.required().example({})
      .description('The field configuration is stored in the pinGroupFieldConfigurations key of the device type object'),
    fields: fieldsFromServerSchema.required().example({ id: 'My measurement location' })
      .description('The field configuration is stored in the fieldConfigurations key of the monitoring environment object'),
    deviceLinkHashId: Joi.string().allow(null).required()
      .description('If null, there is no device installed at this measurement location')
      .example(null),
    gridOrder: Joi.number().integer().allow(null).required()
      .description('Represents the visiting order that minimizes the traveling distance when doing a tour along all measurement locations in this grid')
      .example(12),
    gridOrderUnlinked: Joi.number().integer().allow(null).required()
      .description('Represents the visiting order that minimizes the traveling distance when doing a tour along all measurement locations in this grid that not linked to a device')
      .example(9),
    level: Joi.number().integer().valid(0, 1, 2).required()
      .description('0: no serious or critical open issues, 1: one or more serious open issues an no critical open issues, 2: one or more critical open issues')
      .example(0),
    mapLayer: Joi.string().invalid('nodes').required().example('myLayer'),
    deletedAt: Joi.date().allow(null).required().example(null),
  })
    .description('A collection of pins. Is called a "measurement location" in the GUI. A device can be connected to a pin group. Measurement reports are registered at pin group level.')
    .tag('pinGroup');

  if (apiVersion <= 2) {
    // using defaults allows us to leave the backend unchanged
    return model.keys({
      environmentHashId: Joi.string().default('deprecated'),
      properties: Joi.object().default({}),
    });
  }
  return model;
};

interface PinGroup {
  hashId: string;
  gridHashId: string | null;
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  name: string;
  symbolKey: string;
  deviceFields: FieldsFromServer;
  fields: FieldsFromServer;
  deviceLinkHashId: string | null;
  gridOrder: number | null;
  gridOrderUnlinked: number | null;
  level: 0 | 1 | 2;
  mapLayer: string;
  deletedAt: Date | null;
}

export { schema, PinGroup };
