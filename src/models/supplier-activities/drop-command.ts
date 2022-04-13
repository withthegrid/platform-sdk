import Joi from 'joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';
import { schema as commandSchema, Command } from '../command';
import { schema as commandTypeSchema, CommandType } from '../command-type';

interface DropCommand extends SupplierActivity<'dropCommand'> {
  triggerData: {
    command?: Command;
    commandType?: CommandType;
    removeFromScheduledCommands: boolean;
    markAsDeleted: boolean;
  };
}

const schema = (apiVersion: number): Joi.ObjectSchema => supplierActivityConstructor(
  'dropCommand',
  Joi.object().keys({
    command: commandSchema,
    commandType: commandTypeSchema(apiVersion),
    removeFromScheduledCommands: Joi.boolean().required().example(true),
    markAsDeleted: Joi.boolean().required().example(false),
  }).required(),
)
  .tag('supplierActivityDropCommand')
  .description('User defined function in the connectivity environment that informs the system that a specific command can be removed from the list of scheduled commands. This can be used, for example, as it was sent to the device and is not needed anymore, or when its scheduled execution time has passed.');

export { schema, DropCommand };
