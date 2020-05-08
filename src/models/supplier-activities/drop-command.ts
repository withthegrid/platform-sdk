import Joi from '@hapi/joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';
import { schema as commandSchema, Command } from '../command';


interface DropCommand extends SupplierActivity<'dropCommand'> {
  triggerData: {
    command?: Command;
  };
}

const schema = supplierActivityConstructor(
  'dropCommand',
  Joi.object().keys({
    command: commandSchema,
  }).required(),
)
  .tag('supplierActivityDropCommand')
  .description('Supplier defined function informs the system that a specific command can be removed from the list of scheduled commands. This can be used, for example, as it was sent to the device and is not needed anymore, or when its scheduled execution time has passed.');


export { schema, DropCommand };
