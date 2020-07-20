import Joi from '@hapi/joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';

import { schema as deviceTypeHandlerActivity, DeviceTypeHandlerActivity } from './device-type-handler-activity';

interface HandleLinkUpdate extends SupplierActivity<'handleLinkUpdate'> {
  triggerData: {
  };
  activities: DeviceTypeHandlerActivity[];
}

const schema = (apiVersion: number): Joi.AnySchema => supplierActivityConstructor(
  'handleLinkUpdate',
  Joi.object().keys({
  }).required(),
  deviceTypeHandlerActivity(apiVersion),
)
  .tag('supplierActivityHandleLinkUpdate')
  .description('Supplier defined device type event handler handled an update of the link of the sensor with its pinGroup.');

export { schema, HandleLinkUpdate };
