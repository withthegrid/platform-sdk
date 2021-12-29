import Joi from 'joi';
import { schema as fieldsFromServerSchema, FieldsFromServer } from './fields/fields-from-server';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('ka08d'),
  node1HashId: Joi.string().allow(null).required().example('qp111a'),
  node2HashId: Joi.string().allow(null).required().example('qp111a'),
  geometry: Joi.alternatives().try(
    Joi.object().keys({
      type: Joi.string().valid('LineString').required().example('LineString'),
      coordinates: Joi.array().min(2).max(5000)
        .items(Joi.array().length(2).items(Joi.number()).description('[lon, lat] in WGS84'))
        .required(),
    }).required().example([
      [4.884707950517225, 52.37502141913572],
      [4.882654974236971, 52.355321958806485],
      [4.924301064507517, 52.364277347881085],
    ]),
    Joi.object().keys({
      type: Joi.string().valid('MultiLineString').required(),
      coordinates: Joi.array().min(1).max(500)
        .items(Joi.array().min(2).max(5000)
          .items(Joi.array().length(2).items(Joi.number()).description('[lon, lat] in WGS84')))
        .required(),
    }).required(),
  ),
  name: Joi.string().required().example('My line'),
  fields: fieldsFromServerSchema.required().example({ id: 'My line' })
    .description('The field configuration is stored in the fieldConfigurations key of the monitoring environment object'),
  level: Joi.number().integer().valid(0, 1, 2).required()
    .description('0: no serious or critical open issues, 1: one or more serious open issues an no critical open issues, 2: one or more critical open issues')
    .example(0),
  mapLayer: Joi.string().invalid('nodes').required().example('myLayer'),
  mostRecentMeasurementAt: Joi.date().allow(null).required().example(null),
  deletedAt: Joi.date().allow(null).required().example(null),
})
  .description('A geographical object representing one or more connected series of line segments. Called a "line" in the GUI. If the edge only consists of 1 segment, it should be connected to a node on both ends.')
  .tag('edge');

interface Edge {
  hashId: string;
  node1HashId: string | null;
  node2HashId: string | null;
  geometry: { type: 'LineString'; coordinates: [number, number][] } | { type: 'MultiLineString'; coordinates: [number, number][][] };
  name: string;
  fields: FieldsFromServer;
  level: 0 | 1 | 2;
  mapLayer: string;
  mostRecentMeasurementAt: Date | null;
  deletedAt: Date | null;
}

export { schema, Edge };
