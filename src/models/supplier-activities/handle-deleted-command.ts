import Joi from '@hapi/joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';
import { schema as commandSchema, Command } from '../command';
import { schema as commandTypeSchema, CommandType } from '../command-type';

import { schema as deviceTypeHandlerActivity, DeviceTypeHandlerActivity } from './device-type-handler-activity';

interface HandleDeletedCommand extends SupplierActivity<'handleDeletedCommand'> {
  triggerData: {
    command: Command;
    commandType: CommandType;
  };
  activities: DeviceTypeHandlerActivity[];
}

const schema = (apiVersion: number): Joi.AnySchema => supplierActivityConstructor(
  'handleDeletedCommand',
  Joi.object().keys({
    command: commandSchema.required(),
    commandType: commandTypeSchema.required(),
  }).required(),
  deviceTypeHandlerActivity(apiVersion),
)
  .tag('supplierActivityHandleDeletedCommand')
  .description('Supplier defined device type event handler handled a command that was deleted.');

export { schema, HandleDeletedCommand };
