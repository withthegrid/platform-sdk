import Joi from 'joi';
import { schema as fieldsFromServerSchema, FieldsFromServer } from './fields/fields-from-server';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('qp111a'),
  geometry: Joi.object().keys({
    type: Joi.string().valid('Point').required().example('Point'),
    coordinates: Joi.array().length(2).items(Joi.number())
      .description('[lon, lat] in WGS84')
      .example([4.884707950517225, 52.37502141913572]),
  }).required(),
  name: Joi.string().required().example('My node'),
  fields: fieldsFromServerSchema.required().example({ id: 'My node' })
    .description('The field configuration is stored in the fieldConfigurations key of the monitoring environment object'),
  gridHashId: Joi.string().required().example('naud52'),
  deletedAt: Joi.date().allow(null).required().example(null),
})
  .description('A geographical object representing a point. Is used to connect one or more single line segment edges.')
  .tag('node');

interface Node {
  hashId: string;
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  name: string;
  fields: FieldsFromServer;
  gridHashId: string;
  deletedAt: Date | null;
}

export { schema, Node };
