import Joi from '@hapi/joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';

import { schema as setDeviceFieldsSchema, SetDeviceFields } from './set-device-fields';
import { schema as scheduleCommandSchema, ScheduleCommand } from './schedule-command';
import { schema as measurementSchema, Measurement } from '../measurement';
import { fieldsFromServerSchema, FieldsFromServer } from '../field-configuration';

interface ParseReport extends SupplierActivity<'parseReport'> {
  triggerData: {
    reportTypeHashId?: string;
    payload?: string;
    reportHashId?: string;
    // commandHashId: string | null;
    measurements?: Measurement[];
    fields?: FieldsFromServer;
  };
  activities: (SetDeviceFields | ScheduleCommand)[];
}

const schema = (apiVersion: number): Joi.AnySchema => supplierActivityConstructor(
  'parseReport',
  Joi.object().keys({
    reportTypeHashId: Joi.string().example('l19a7s'),
    payload: Joi.string().example('[123, 987]'),
    reportHashId: Joi.string().example('qoa978'),
    // commandHashId: Joi.string().allow(null).required().example(null),
    measurements: Joi.array().items(measurementSchema(apiVersion)),
    fields: fieldsFromServerSchema.example({}),
  }).required(),
  Joi.alternatives().try(
    setDeviceFieldsSchema,
    scheduleCommandSchema,
  ),
)
  .tag('supplierActivityParseReport')
  .description('Supplier defined function informs the system incoming data should be converted into a measurement report.');

export { schema, ParseReport };
