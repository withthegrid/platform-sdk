import Joi from '@hapi/joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';
import { schema as commandSchema, Command } from '../command';
import { schema as commandTypeSchema, CommandType } from '../command-type';

interface MarkCommandAsSent extends SupplierActivity<'markCommandAsSent'> {
  triggerData: Record<string, never> | {
    command: Command;
    commandType: CommandType;
  };
}

const schema = supplierActivityConstructor(
  'markCommandAsSent',
  Joi.alternatives().try(
    Joi.object().keys({
      command: commandSchema.required(),
      commandType: commandTypeSchema.required(),
    }).required(),
    Joi.object().keys({}).required(),
  ).required(),
)
  .tag('supplierActivityMarkCommandAsSent')
  .description('Supplier defined function informs the system that a specific command has been shared with a specific device.');

export { schema, MarkCommandAsSent };
