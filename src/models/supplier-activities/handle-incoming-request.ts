import Joi from 'joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';
import { schema as webRequestSchema, WebRequest } from '../web-request';

import { schema as deviceTypeHandlerActivity, DeviceTypeHandlerActivity } from './device-type-handler-activity';

interface HandleIncomingRequest extends SupplierActivity<'handleIncomingRequest'> {
  triggerData: {
    request: WebRequest;
    identifier?: {
      type: 'certificate' | 'webhook';
      hashId: string;
    };
  };
  activities: DeviceTypeHandlerActivity[];
}

const schema = (apiVersion: number): Joi.ObjectSchema => supplierActivityConstructor(
  'handleIncomingRequest',
  Joi.object().keys({
    request: webRequestSchema.required(),
    identifier: Joi.object().keys({
      type: Joi.string().valid('certificate', 'webhook').example('webhook').required(),
      hashId: Joi.string().example('z812a63').required(),
    }),
  }).required(),
  deviceTypeHandlerActivity(apiVersion),
)
  .tag('supplierActivityHandleIncomingRequest')
  .description('Device type event handler handled an incoming request for a specific device type.');

export { schema, HandleIncomingRequest };
