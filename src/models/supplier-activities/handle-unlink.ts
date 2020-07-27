import Joi from '@hapi/joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';

import { schema as deviceTypeHandlerActivity, DeviceTypeHandlerActivity } from './device-type-handler-activity';

interface HandleUnlink extends SupplierActivity<'handleUnlink'> {
  triggerData: {
  };
  activities: DeviceTypeHandlerActivity[];
}

const schema = (apiVersion: number): Joi.ObjectSchema => supplierActivityConstructor(
  'handleUnlink',
  Joi.object().keys({
  }).required(),
  deviceTypeHandlerActivity(apiVersion),
)
  .tag('supplierActivityHandleUnlink')
  .description('Supplier defined device type event handler handled the unlinking of the sensor from a pinGroup.');

export { schema, HandleUnlink };
