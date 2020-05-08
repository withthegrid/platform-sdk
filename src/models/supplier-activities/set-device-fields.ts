import Joi from '@hapi/joi';

import { Fields, fieldsSchema } from '../field-configuration';
import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';


interface SetDeviceFields extends SupplierActivity<'setDeviceFields'> {
  triggerData: {
    diff?: {
      old: Fields;
      new: Fields;
    };
  };
}

const schema = supplierActivityConstructor(
  'setDeviceFields',
  Joi.object().keys({
    diff: Joi.object().keys({
      old: fieldsSchema.required(),
      new: fieldsSchema.required(),
    }).example({ old: { version: '1.1' }, new: { version: '1.2' } }),
  }).required(),
)
  .tag('supplierActivitySetDeviceFields')
  .description('Supplier defined function that updates a device\'s fields.');


export { schema, SetDeviceFields };
