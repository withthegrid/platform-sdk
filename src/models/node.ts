import Joi from '@hapi/joi';
import { fieldsSchema, Fields } from './field-configuration';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('qp111a'),
  geometry: Joi.object().keys({
    type: Joi.string().valid('Point').required().example('Point'),
    coordinates: Joi.array().length(2).items(Joi.number())
      .description('[lon, lat] in WGS84')
      .example([4.884707950517225, 52.37502141913572]),
  }).required(),
  name: Joi.string().required().example('My node'),
  fields: fieldsSchema.required().example({ id: 'My node' })
    .description('The list of keys for an environment can be obtained by requesting the environment model (returned at login)'),
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
  fields: Fields;
  gridHashId: string;
  deletedAt: Date | null;
}

export { schema, Node };
