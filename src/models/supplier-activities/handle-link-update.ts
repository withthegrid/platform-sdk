import Joi from 'joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';

import { schema as deviceTypeHandlerActivity, DeviceTypeHandlerActivity } from './device-type-handler-activity';

interface HandleLinkUpdate extends SupplierActivity<'handleLinkUpdate'> {
  triggerData: Record<string, never>;
  activities: DeviceTypeHandlerActivity[];
}

const schema = (apiVersion: number): Joi.ObjectSchema => supplierActivityConstructor(
  'handleLinkUpdate',
  Joi.object().keys({
  }).required(),
  deviceTypeHandlerActivity(apiVersion),
)
  .tag('supplierActivityHandleLinkUpdate')
  .description('Device type event handler handled an update of the installation between device and location.');

export { schema, HandleLinkUpdate };
