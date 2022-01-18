import Joi from 'joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';
import { schema as commandSchema, Command } from '../command';
import { schema as commandTypeSchema, CommandType } from '../command-type';

interface MarkCommandAsSent extends SupplierActivity<'markCommandAsSent'> {
  triggerData: Record<string, never> | {
    command: Command;
    commandType: CommandType;
  };
}

const schema = (apiVersion: number): Joi.ObjectSchema => supplierActivityConstructor(
  'markCommandAsSent',
  Joi.alternatives().try(
    Joi.object().keys({
      command: commandSchema.required(),
      commandType: commandTypeSchema(apiVersion).required(),
    }).required(),
    Joi.object().keys({}).required(),
  ).required(),
)
  .tag('supplierActivityMarkCommandAsSent')
  .description('User defined function in the connectivity environment that informs the system that a specific command has been shared with a specific device.');

export { schema, MarkCommandAsSent };
