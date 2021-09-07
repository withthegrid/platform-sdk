import Joi from 'joi';

import { schema as baseFieldsSchema, BaseFields } from '../fields/base-fields';
import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';

interface SetDeviceFields extends SupplierActivity<'setDeviceFields'> {
  triggerData: {
    diff?: {
      old: BaseFields;
      new: BaseFields;
    };
  };
}

const schema = supplierActivityConstructor(
  'setDeviceFields',
  Joi.object().keys({
    diff: Joi.object().keys({
      old: baseFieldsSchema.required(),
      new: baseFieldsSchema.required(),
    }).example({ old: { version: '1.1' }, new: { version: '1.2' } }),
  }).required(),
)
  .tag('supplierActivitySetDeviceFields')
  .description('User defined function in the connectivity environment that updates a device\'s fields.');

export { schema, SetDeviceFields };
