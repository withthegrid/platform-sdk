import Joi from '@hapi/joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';
import { schema as commandSchema, Command } from '../command';


interface MarkCommandAsSent extends SupplierActivity<'markCommandAsSent'> {
  triggerData: {
    command?: Command;
  };
}

const schema = supplierActivityConstructor(
  'markCommandAsSent',
  Joi.object().keys({
    command: commandSchema,
  }).required(),
)
  .tag('supplierActivityMarkCommandAsSent')
  .description('Supplier defined function informs the system that a specific command has been shared with a specific device.');


export { schema, MarkCommandAsSent };
