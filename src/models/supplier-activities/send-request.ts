import Joi from '@hapi/joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';
import { schema as webRequestSchema, WebRequest } from '../web-request';

interface SendRequest extends SupplierActivity<'sendRequest'> {
  triggerData: {
    request?: WebRequest;
  };
}

const schema = supplierActivityConstructor(
  'sendRequest',
  Joi.object().keys({
    request: webRequestSchema,
  }).required(),
)
  .tag('supplierActivitySendRequest')
  .description('Supplier defined function performs an HTTP request.');

export { schema, SendRequest };
