import Joi from 'joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';

import { schema as setDeviceFieldsSchema, SetDeviceFields } from './set-device-fields';
import { schema as scheduleCommandSchema, ScheduleCommand } from './schedule-command';
import { schema as measurementSchema, Measurement } from '../measurement';
import { schema as quantitySchema, Quantity } from '../quantity';

import { schema as reportTypeSchema, ReportType } from '../report-type';
import { schema as fieldsFromServerSchema, FieldsFromServer } from '../fields/fields-from-server';

interface ParseReport extends SupplierActivity<'parseReport'> {
  triggerData: {
    reportType?: ReportType;
    payload?: string;
    reportHashId?: string;
    // commandHashId: string | null;
    observations?: {
      measurement: Measurement;
      quantity: Quantity;
    }[];
    fields?: FieldsFromServer;
  };
  activities: (SetDeviceFields | ScheduleCommand)[];
}

const schema = (apiVersion: number): Joi.ObjectSchema => supplierActivityConstructor(
  'parseReport',
  Joi.object().keys({
    reportType: reportTypeSchema,
    payload: Joi.string().example('[123, 987]'),
    reportHashId: Joi.string().example('qoa978'),
    // commandHashId: Joi.string().allow(null).required().example(null),
    observations: Joi.array().items(Joi.object().keys({
      measurement: measurementSchema(apiVersion).required(),
      quantity: quantitySchema.required(),
    })),
    fields: fieldsFromServerSchema.example({}),
  }).required(),
  Joi.alternatives().try(
    setDeviceFieldsSchema,
    scheduleCommandSchema,
  ),
)
  .tag('supplierActivityParseReport')
  .description('User defined function in the connectivity environment that informs the system incoming data should be converted into a measurement report.');

export { schema, ParseReport };
