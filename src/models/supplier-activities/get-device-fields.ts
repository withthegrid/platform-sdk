import Joi from 'joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';

interface GetDeviceFields extends SupplierActivity<'getDeviceFields'> {
    triggerData: Record<string, never>;
}

const schema = supplierActivityConstructor(
  'getDeviceFields',
  Joi.object().keys({
  }).required(),
)
  .tag('supplierActivityGetDeviceFields')
  .description('User defined function in the connectivity environment that gets the device fields of location or a port.');

export { schema, GetDeviceFields };
