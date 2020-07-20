import Joi from '@hapi/joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';

import { schema as deviceTypeHandlerActivity, DeviceTypeHandlerActivity } from './device-type-handler-activity';

interface HandleLink extends SupplierActivity<'handleLink'> {
  triggerData: {
  };
  activities: DeviceTypeHandlerActivity[];
}

const schema = (apiVersion: number): Joi.AnySchema => supplierActivityConstructor(
  'handleLink',
  Joi.object().keys({
  }).required(),
  deviceTypeHandlerActivity(apiVersion),
)
  .tag('supplierActivityHandleLink')
  .description('Supplier defined device type event handler handled linking the sensor to a pinGroup.');

export { schema, HandleLink };
