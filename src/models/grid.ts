import Joi from '@hapi/joi';
import { fieldsFromServerSchema, FieldsFromServer } from './field-configuration';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('naud51'),
  typeKey: Joi.string().valid('node', 'pinGroup').required().example('pinGroup'),
  name: Joi.string().required().example('My grid'),
  fields: fieldsFromServerSchema.required().example({ id: 'My grid' })
    .description('The list of keys for an environment can be obtained by requesting the environment model (returned at login)'),
  deletedAt: Joi.date().allow(null).required().example(null),
})
  .tag('grid')
  .description('A collection of pin groups or nodes. In the GUI, only pinGroup grids are used.');


interface Grid {
  hashId: string;
  typeKey: 'node' | 'pinGroup';
  name: string;
  fields: FieldsFromServer;
  deletedAt: Date | null;
}

export { schema, Grid };
