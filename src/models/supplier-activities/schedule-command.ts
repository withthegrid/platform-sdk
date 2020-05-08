import Joi from '@hapi/joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';
import { schema as commandSchema, Command } from '../command';


interface ScheduleCommand extends SupplierActivity<'scheduleCommand'> {
  triggerData: {
    command?: Command;
  };
}

const schema = supplierActivityConstructor(
  'scheduleCommand',
  Joi.object().keys({
    command: commandSchema,
  }).required(),
)
  .tag('supplierActivityScheduleCommand')
  .description('Supplier defined function informs the system that a command for a specific device should be scheduled.');


export { schema, ScheduleCommand };
