import Joi from '@hapi/joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';
import { schema as webRequestSchema, WebRequest } from '../web-request';

import { schema as deviceTypeHandlerActivity, DeviceTypeHandlerActivity } from './device-type-handler-activity';

interface HandleIncomingRequest extends SupplierActivity<'handleIncomingRequest'> {
  triggerData: {
    request: WebRequest;
  };
  activities: DeviceTypeHandlerActivity[];
}

const schema = (apiVersion: number): Joi.AnySchema => supplierActivityConstructor(
  'handleIncomingRequest',
  Joi.object().keys({
    request: webRequestSchema.required(),
  }).required(),
  deviceTypeHandlerActivity(apiVersion),
)
  .tag('supplierActivityHandleIncomingRequest')
  .description('Supplier defined device type event handler handled an incoming request for a specific device type.');

export { schema, HandleIncomingRequest };
