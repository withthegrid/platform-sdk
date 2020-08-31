import Joi from 'joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';
import { schema as commandSchema, Command } from '../command';
import { schema as commandTypeSchema, CommandType } from '../command-type';

import { schema as deviceTypeHandlerActivity, DeviceTypeHandlerActivity } from './device-type-handler-activity';

interface HandleNewCommand extends SupplierActivity<'handleNewCommand'> {
  triggerData: Record<string, never> | {
    command: Command;
    commandType: CommandType;
  };
  activities: DeviceTypeHandlerActivity[];
}

const schema = (apiVersion: number): Joi.ObjectSchema => supplierActivityConstructor(
  'handleNewCommand',
  Joi.alternatives().try(
    Joi.object().keys({
      command: commandSchema.required(),
      commandType: commandTypeSchema.required(),
    }).required(),
    Joi.object().keys({}).required(),
  ).required(),
  deviceTypeHandlerActivity(apiVersion),
)
  .tag('supplierActivityHandleNewCommand')
  .description('Device type event handler handled a new command for a specific device type. Useful if the command should be shared with a 3rd party by issuing an HTTP request.');

export { schema, HandleNewCommand };
