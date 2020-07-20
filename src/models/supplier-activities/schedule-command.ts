import Joi from '@hapi/joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';
import { schema as commandSchema, Command } from '../command';
import { schema as commandTypeSchema, CommandType } from '../command-type';


interface ScheduleCommand extends SupplierActivity<'scheduleCommand'> {
  triggerData: Record<string, never> | {
    command: Command;
    commandType: CommandType;
  };
}

const schema = supplierActivityConstructor(
  'scheduleCommand',
  Joi.alternatives().try(
    Joi.object().keys({
      command: commandSchema.required(),
      commandType: commandTypeSchema.required(),
    }).required(),
    Joi.object().keys({}).required(),
  ).required(),
)
  .tag('supplierActivityScheduleCommand')
  .description('Supplier defined function informs the system that a command for a specific device should be scheduled.');


export { schema, ScheduleCommand };
