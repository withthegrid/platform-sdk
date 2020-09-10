import Joi from 'joi';
import { schema as fieldsFromServerSchema, FieldsFromServer } from './fields/fields-from-server';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('naud51'),
  typeKey: Joi.string().valid('node', 'pinGroup').required().example('pinGroup'),
  name: Joi.string().required().example('My grid'),
  fields: fieldsFromServerSchema.required().example({ id: 'My grid' })
    .description('The field configuration is stored in the fieldConfigurations key of the monitoring environment object'),
  deletedAt: Joi.date().allow(null).required().example(null),
})
  .tag('grid')
  .description('A collection of locations (pinGroups) or nodes. In the GUI, only pinGroup grids are used.');

interface Grid {
  hashId: string;
  typeKey: 'node' | 'pinGroup';
  name: string;
  fields: FieldsFromServer;
  deletedAt: Date | null;
}

export { schema, Grid };
