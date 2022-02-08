import Joi from 'joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';
import { schema as commandSchema, Command } from '../command';
import { schema as commandTypeSchema, CommandType } from '../command-type';

import { schema as deviceTypeHandlerActivity, DeviceTypeHandlerActivity } from './device-type-handler-activity';

interface HandleCommandDue extends SupplierActivity<'handleCommandDue'> {
  triggerData: {
    command: Command;
    commandType: CommandType;
  };
  activities: DeviceTypeHandlerActivity[];
}

const schema = (apiVersion: number): Joi.ObjectSchema => supplierActivityConstructor(
  'handleCommandDue',
  Joi.object().keys({
    command: commandSchema.required(),
    commandType: commandTypeSchema(apiVersion).required(),
  }).required(),
  deviceTypeHandlerActivity(apiVersion),
)
  .tag('supplierActivityHandleCommandDue')
  .description('Device type event handler handled a command that was due.');

export { schema, HandleCommandDue };
