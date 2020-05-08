import Joi from '@hapi/joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';
import { schema as commandSchema, Command } from '../command';

import { schema as deviceTypeHandlerActivity, DeviceTypeHandlerActivity } from './device-type-handler-activity';

interface HandleCommandDue extends SupplierActivity<'handleCommandDue'> {
  triggerData: {
    command: Command;
  };
  activities: DeviceTypeHandlerActivity[];
}

const schema = (apiVersion: number): Joi.AnySchema => supplierActivityConstructor(
  'handleCommandDue',
  Joi.object().keys({
    command: commandSchema.required(),
  }).required(),
  deviceTypeHandlerActivity(apiVersion),
)
  .tag('supplierActivityHandleCommandDue')
  .description('Supplier defined device type event handler handled a command that was due.');


export { schema, HandleCommandDue };
