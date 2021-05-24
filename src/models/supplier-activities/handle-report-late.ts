import Joi from 'joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';

import { schema as deviceTypeHandlerActivity } from './device-type-handler-activity';

interface HandleReportLate extends SupplierActivity<'handleReportLate'> {
  triggerData: {
  };
}

const schema = (apiVersion: number): Joi.ObjectSchema => supplierActivityConstructor(
  'handleReportLate',
  Joi.object().keys({
  }).required(),
  deviceTypeHandlerActivity(apiVersion),
)
  .tag('supplierActivityHandleLink')
  .description('Device type event handler handled the installation of a device at a location.');

export { schema, HandleReportLate };
