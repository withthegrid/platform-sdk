import Joi from '@hapi/joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';
import { schema as commandSchema, Command } from '../command';
import { schema as commandTypeSchema, CommandType } from '../command-type';

interface DropCommand extends SupplierActivity<'dropCommand'> {
  triggerData: Record<string, never> | {
    command: Command;
    commandType: CommandType;
  };
}

const schema = supplierActivityConstructor(
  'dropCommand',
  Joi.alternatives().try(
    Joi.object().keys({
      command: commandSchema.required(),
      commandType: commandTypeSchema.required(),
    }).required(),
    Joi.object().keys({}).required(),
  ).required(),
)
  .tag('supplierActivityDropCommand')
  .description('Supplier defined function informs the system that a specific command can be removed from the list of scheduled commands. This can be used, for example, as it was sent to the device and is not needed anymore, or when its scheduled execution time has passed.');

export { schema, DropCommand };
