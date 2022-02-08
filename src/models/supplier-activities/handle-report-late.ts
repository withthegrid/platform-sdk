import Joi from 'joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';

import { schema as deviceTypeHandlerActivity } from './device-type-handler-activity';

interface HandleReportLate extends SupplierActivity<'handleReportLate'> {
  triggerData: Record<string, never>;
}

const schema = (apiVersion: number): Joi.ObjectSchema => supplierActivityConstructor(
  'handleReportLate',
  Joi.object().keys({
  }).required(),
  deviceTypeHandlerActivity(apiVersion),
)
  .tag('supplierActivityHandleReportLate')
  .description('Device type event handler handled the device not reporting in on time.');

export { schema, HandleReportLate };
